import { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    showModal: false,
    filter: '',
    showFilter: false,
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contats) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = formData => {
    const { name } = formData;
    const existingContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert('This contact already exists!');
    } else {
      this.setState(prevState => ({
        contacts: [formData, ...prevState.contacts],
      }));
    }
  };

  handleSearch = event => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  toggleFilter = () => {
    this.setState(prevState => ({
      showFilter: !prevState.showFilter,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { contacts, filter, showFilter, showModal } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className="wrapper">
        <h1 className="main__heading">Phonebook</h1>
        <button type="button" onClick={this.toggleModal}>
          Open modal
        </button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <button type="button" onClick={this.toggleModal}>
              Close modal
            </button>
            <ContactForm onFormSubmit={this.addContact} />
          </Modal>
        )}

        <h2 className="secondary__heading" onClick={this.toggleFilter}>
          Contacts
          <FontAwesomeIcon icon={faSearch} className="searchIcon" />
        </h2>

        {showFilter && (
          <Filter
            value={filter}
            onChange={this.handleSearch}
            contacts={contacts}
          />
        )}

        {filter === '' ? (
          <ContactList
            contacts={contacts}
            onDeleteContact={this.deleteContact}
          />
        ) : (
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          />
        )}
      </div>
    );
  }
}
