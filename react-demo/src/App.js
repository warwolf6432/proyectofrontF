import React, { useState } from 'react';
import Calendar from 'react-calendar';

// Componente de registro de usuario
const UserRegistrationForm = ({ onUserRegistration , registeredUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegistration = (e) => {
    e.preventDefault();

    // Crear un nuevo objeto de usuario con los datos ingresados
    const newUser = {
      name,
      email,
      phone
    };

    // Llamar a la función de registro de usuario del componente padre
    onUserRegistration(newUser);

    // Restablecer los valores de los campos del formulario
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleRegistration}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Teléfono"
        />
        <button type="submit">Registrarse</button>
      </form>
      <h2>Usuarios Registrados</h2>
      <ul>
        {registeredUsers.map((user, index) => (
          <li key={index}>
            <p>Nombre: {user.name}</p>
            <p>Correo electrónico: {user.email}</p>
            <p>Teléfono: {user.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Componente de creación de turnos
const AppointmentCreation = ({ registeredUsers }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const handleUserSelection = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleAppointmentRegistration = (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedUser) {
      alert('Por favor, selecciona una fecha y un usuario');
      return;
    }

    const appointmentData = {
      date: selectedDate,
      user: selectedUser
    };

    setAppointments([...appointments, appointmentData]);

    setSelectedDate(null);
    setSelectedUser(null);
  };

  return (
    <div>
      <h2>Calendario Mensual</h2>
      <Calendar onChange={handleDateSelection} value={selectedDate} />

      {selectedDate && (
        <form onSubmit={handleAppointmentRegistration}>
          <h3>Turno programado para: {selectedDate.toString()}</h3>
          <select value={selectedUser} onChange={handleUserSelection}>
            <option value="">Seleccionar Usuario</option>
            {registeredUsers.map((user, index) => (
              <option value={user.name} key={index}>
                {user.name}
              </option>
            ))}
          </select>
          <button type="submit">Registrar Turno</button>
        </form>
      )}

      <h2>Turnos Registrados</h2>
      {appointments.map((appointment, index) => (
        <div key={index}>
          <p>Fecha: {appointment.date.toString()}</p>
          <p>Usuario: {appointment.user}</p>
        </div>
      ))}
    </div>
  );
};


// Componente de notificaciones


const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  // Función para programar una notificación
  const scheduleNotification = (date, message) => {
    const notification = {
      date,
      message
    };

    setNotifications([...notifications, notification]);
  };

  return (
    <div>
      <h2>Notificaciones</h2>
      {notifications.map((notification, index) => (
        <div key={index}>
          <p>Fecha: {notification.date.toString()}</p>
          <p>Mensaje: {notification.message}</p>
        </div>
      ))}
    </div>
  );
};




// Componente de calificación y comentarios
const RatingAndReviews = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que se haya seleccionado una calificación
    if (rating === 0) {
      alert('Por favor, selecciona una calificación');
      return;
    }

    // Validar que se haya ingresado un comentario
    if (comment.trim() === '') {
      alert('Por favor, ingresa un comentario');
      return;
    }

    // Aquí puedes realizar la lógica para manejar la calificación y comentario localmente
    const ratingAndComment = {
      rating,
      comment
    };

    // Agregar el nuevo comentario a la lista de comentarios
    setComments([...comments, ratingAndComment]);

    // Restablecer los valores de calificación y comentario
    setRating(0);
    setComment('');
  };

  return (
    <div>
      <h2>Calificación y Comentarios</h2>
      <div>
        <label>Calificación:</label>
        <select value={rating} onChange={(e) => handleRatingChange(parseInt(e.target.value))}>
          <option value={0}>Seleccionar</option>
          <option value={1}>1 Estrella</option>
          <option value={2}>2 Estrellas</option>
          <option value={3}>3 Estrellas</option>
          <option value={4}>4 Estrellas</option>
          <option value={5}>5 Estrellas</option>
        </select>
      </div>
      <div>
        <label>Comentario:</label>
        <textarea value={comment} onChange={handleCommentChange} placeholder="Escribe tu comentario..." />
      </div>
      <button onClick={handleSubmit}>Enviar</button>

      <h3>Comentarios Registrados:</h3>
      {comments.length === 0 ? (
        <p>No hay comentarios registrados.</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <p>Calificación: {comment.rating}</p>
              <p>Comentario: {comment.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


// Componente principal de la aplicación
const App = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  
  const handleUserRegistration = (newUser) => {
  setRegisteredUsers([...registeredUsers, newUser]);
  };
  
  return (
  <div>
  <h1>Registro de Usuarios</h1>
  <UserRegistrationForm onUserRegistration={handleUserRegistration} registeredUsers={registeredUsers} />
  <h1>Creación de Turnos</h1>
  <AppointmentCreation registeredUsers={registeredUsers} />
  <Notifications />
  <RatingAndReviews />
  </div>
  );
  };


export default App;
