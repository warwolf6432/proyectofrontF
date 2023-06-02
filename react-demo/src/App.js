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
    <div class="m-20 ">
      <h2 class=" text-3xl font-bold text-center my-8">Registro de Usuario</h2>
      <form class="w-3/5 mx-auto text-center" onSubmit={handleRegistration}>
        <input
          class="inline-block w-1/3 bg-slate-300 rounded-lg p-2 m-2"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
        />
        <input
          class="inline-block w-1/3 bg-slate-300 rounded-lg p-2 m-2"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Teléfono"
          required
        />
        <input
          class="inline-block w-2/3 bg-slate-300 rounded-lg m-2 p-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
        />
        <button class="block w-2/3 mx-auto p-4 bg-green-600 text-white rounded-lg font-bold" type="submit">Registrarse</button>
      </form>
      <h2 class="text-3xl font-bold m-8 mt-20">Usuarios Registrados</h2>
      <ul class="grid grid-cols-3 h-auto m-8 text-slate-500 font-medium">
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

//calculamos el dia de hoy 
const Diahoy = () => {
  let hoy = new Date();
  let horas = hoy.getHours()*60*60*1000;
  let minutos= hoy.getMinutes()*60*1000;
  let segundos= hoy.getSeconds()*1000;
  let tiempohoy=horas+minutos+segundos;
  hoy= new Date(hoy.getTime() - tiempohoy);
  return hoy;
}

//calculamos el dia anterior al turno seleccionado
const DiaAnterior = (date) => {
  let hoy = date;
  let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
  let ayer = new Date(hoy.getTime() - DIA_EN_MILISEGUNDOS);
  return ayer;
}


// Componente de creación de turnos
const AppointmentCreation = ({ registeredUsers }) => {
const [selectedDate, setSelectedDate] = useState("");
const [selectedUser, setSelectedUser] = useState("");
const [appointments, setAppointments] = useState([]);

const handleDateSelection = (date) => {
  setSelectedDate(date);
};

const handleUserSelection = (e) => {
  setSelectedUser(e.target.value);
};

const handleAppointmentRegistration = (e) => {
  e.preventDefault();

  if (selectedDate === "" || selectedUser === "") {
    alert('Por favor, selecciona una fecha y un usuario');
    return;
  }
  else{
    //pruebas de corroborar fecha
    let diaanterior= DiaAnterior(selectedDate).toDateString();
    let diahoy= Diahoy().toDateString();
    if(diaanterior=== diahoy){
      window.alert("Se le notifica que su turno solicitado es mañana")
    }
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
    <div class="text-center font-semibold w-4/5 mx-auto">
      <h2 class="block text-center font-bold text-xl my-4">Calendario Mensual</h2>
      <Calendar onChange={handleDateSelection} value={selectedDate} />

      {selectedDate && (
        <form class="bg-green-600 rounded-2xl m-4 p-2" onSubmit={handleAppointmentRegistration}>
          <h3 class=" text-slate-200 my-2">
            Turno programado para: {selectedDate.toString().substring(0,15)} a la hora {selectedDate.toString().substring(15,21)}
            </h3>
          <select class="bg-white rounded-3xl inline-block py-2 px-8 mx-4" value={selectedUser} onChange={handleUserSelection}>
            <option value="">Seleccionar Usuario</option>
            {registeredUsers.map((user, index) => (
              <option value={user.name} key={index}>
                {user.name}
              </option>
            ))}
          </select>
          <button class="bg-white rounded-3xl inline-block py-2 px-8 mx-4" type="submit">Registrar Turno</button>
        </form>
      )}

      <h2 class="block font-bold text-xl my-8 text-left">Turnos Registrados</h2>
      <div class="grid grid-cols-3 h-auto m-8 text-slate-500 font-medium">
        {appointments.map((appointment, index) => (
          <div key={index}>
            <p>Fecha: {appointment.date.toString().substring(0,15)} hora: {appointment.date.toString().substring(15,21)}</p>
            <p>Usuario: {appointment.user}</p>
          </div>
        ))}
      </div>
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
    <div class="m-20 font-medium">
      <h2 class=" text-3xl font-bold text-center my-8">Calificación y Comentarios</h2>
      <div class="bg-green-600 rounded-3xl p-8 pb-16">
        <div class="bg-white rounded-3xl inline-block px-8 text-centered">
          <label class="bg-white rounded-3xl inline-block py-2 px-8" >Calificación:</label>
          <select class="bg-white rounded-3xl inline-block py-2 px-8 text-slate-500 font-medium" value={rating} onChange={(e) => handleRatingChange(parseInt(e.target.value))}>
            <option value={0}>Seleccione una opcion</option>
            <option value={5}>5 Estrellas</option>
            <option value={4}>4 Estrellas</option>
            <option value={3}>3 Estrellas</option>
            <option value={2}>2 Estrellas</option>
            <option value={1}>1 Estrella </option>
          </select>
        </div>
        <div class="bg-white rounded-3xl block my-4 ">
          <label class="bg-white rounded-3xl block py-2 px-8">Comentario:</label>
          <textarea class="bg-white rounded-3xl w-full py-2 px-8 text-slate-500 font-medium" value={comment} onChange={handleCommentChange} placeholder="Escribe tu comentario..." />
        </div>
        <button class="bg-white rounded-3xl py-2 px-8 absolute right-28" onClick={handleSubmit}>Enviar</button>
      </div>

      <h3 class="block font-bold text-xl my-8 text-left">Comentarios</h3>
      {comments.length === 0 ? (
        <p>No hay comentarios registrados.</p>
      ) : (
        <ul class="grid grid-cols-3">
          {comments.map((comment, index) => (
            <li class=" rounded-lg shadow-2xl border m-2 p-4 " key={index}>
              <p class="font-semibold">Calificación: {comment.rating}</p>
              <p class="text-slate-500 font-normal break-words h-auto m-2">{comment.comment}</p>
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
    <h1 class="font-bold text-3xl bg-green-600 h-12 text-white pt-1 pl-4">MeTocaFinal LTDA</h1>
    <UserRegistrationForm onUserRegistration={handleUserRegistration} registeredUsers={registeredUsers} />
    <h1 class="text-3xl font-bold m-8 mx-28">Creación de Turnos</h1>
    <AppointmentCreation registeredUsers={registeredUsers} />
    <Notifications />
    <RatingAndReviews />
  </div>
  );
  };


export default App;
