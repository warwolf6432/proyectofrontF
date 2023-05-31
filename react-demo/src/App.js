import React, { useState } from 'react';
import Calendar from 'react-calendar';

// Componente de registro de usuario
const UserRegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handleRegistration = (e) => {
    e.preventDefault();

    // Crear un nuevo objeto de usuario con los datos ingresados
    const newUser = {
      name,
      email,
      phone
    };

    // Actualizar la lista de usuarios registrados
    setRegisteredUsers([...registeredUsers, newUser]);

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
      {registeredUsers.map((user, index) => (
        <div key={index}>
          <p>Nombre: {user.name}</p>
          <p>Correo electrónico: {user.email}</p>
          <p>Teléfono: {user.phone}</p>
        </div>
      ))}
    </div>
  );
};

// Componente de creación de turnos
const AppointmentCreation = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  
    // Simular la lógica de registro de turno localmente
    const appointmentData = {
      date: date,
      // Otros datos del turno como el usuario, el médico, etc.
    };
  
    // Imprimir los datos del turno en la consola
    console.log('Turno registrado:', appointmentData);
  };
  

  return (
    <div>
      <h2>Calendario Mensual</h2>
      {/* Componente de calendario para seleccionar una fecha */}
      <Calendar onChange={handleDateSelection} value={selectedDate} />
      {selectedDate && <p>Turno programado para: {selectedDate.toString()}</p>}
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
  
    // Imprimir los datos de calificación y comentario en la consola
    console.log('Calificación y comentario:', ratingAndComment);
  
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
    </div>
  );
};

// Componente principal de la aplicación
const App = () => {
  return (
    <div>
      <h1>Registro de Usuarios</h1>
      <UserRegistrationForm />
      <h1>Creación de Turnos</h1>
      <AppointmentCreation />
      <Notifications />
      <RatingAndReviews />
    </div>
  );
};


export default App;
