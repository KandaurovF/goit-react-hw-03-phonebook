import { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    showFilter: false,
  };

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

  render() {
    const { contacts, filter, showFilter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className="wrapper">
        <h1 className="main__heading">Phonebook</h1>
        <ContactForm onFormSubmit={this.addContact} />

        <h2 className="secondary__heading" onClick={this.toggleFilter}>
          Contacts
          <FontAwesomeIcon icon={faSearch} className="searchIcon" />
        </h2>

        {showFilter && <Filter value={filter} onChange={this.handleSearch} />}

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
