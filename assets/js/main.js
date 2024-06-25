/**
* Template Name: Append
* Template URL: https://bootstrapmade.com/append-bootstrap-website-template/
* Updated: May 18 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      if (document.querySelector('.mobile-nav-active')) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.swiper').forEach(function(swiper) {
      let config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(swiper, config);
    });
  }
  window.addEventListener('load', initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }





  document.addEventListener('DOMContentLoaded', function() {
    const cardContainer = document.getElementById('card-container');
    if (!cardContainer) {
        console.error('Card container element not found');
        return;
    }

    fetch('http://localhost:8080/replica/get-all')
    .then(response => response.json())
    .then(data => {
        if (data && data.data) {
            data.data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'col-lg-4 col-md-6 member';
                card.setAttribute('data-aos', 'fade-up');
                card.setAttribute('data-aos-delay', '100');

                const imgSrc = item.photo_url || 'assets/img/default-avatar.jpg';

                card.innerHTML = `
                    <div class="member-img">
                        <img src="${imgSrc}" class="img-fluid" alt="">
                        
                    </div>
                    <div class="member-info text-center">
                            <h2>Virgen</h4>
                        <h4>${item.repl_name}</h4>
                        <span>Code: ${item.code}</span>
                        <p>propietario: ${item.user_name}</p>
                        <p>Email: ${item.user_email}</p>
                        <p>Phone: ${item.user_cellphone}</p>
                        <p>Country: ${item.user_country}</p>
                        <p>City: ${item.user_city}</p>
                    </div>
                `;

                cardContainer.appendChild(card);
            });
        } else {
            console.error('Invalid data format:', data);
        }
    })
    .catch(error => {
        console.error('Error al obtener datos:', error);
    });
});





/**
 * Piligrimage fetch
 */

// Variables globales para almacenar los servicios y el índice actual
let allServices = [];
let currentIndex = 0;

// Fetch data and populate the Services section
fetch('http://localhost:8080/pilgrimage/get-all')
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      throw new Error(data.error);
    }
    allServices = data.data; // Almacenar todos los servicios
    populateServices(allServices.slice(currentIndex, currentIndex + 9)); // Mostrar solo las 10 más recientes
    if (allServices.length > 9) {
      createLoadMoreButton(); // Crear botón para cargar más
    }
  })
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });

function populateServices(servicesData) {
  const servicesContainer = document.getElementById('services-container');
  servicesContainer.innerHTML = ''; // Limpiar cualquier contenido existente

  servicesData.forEach(service => {
    const serviceItem = document.createElement('div');
    serviceItem.className = 'col-lg-4 col-md-6 d-flex align-items-stretch'; // Clases para el diseño responsivo

    serviceItem.innerHTML = `
    
      <div class="service-item">
        <div class="icon"><i class="bx bxl-dribbble"></i></div>
        <h4 class="title"><a href="#">${service.intention}</a></h4>
        <p class="description">
          <strong>City:</strong> ${service.city}<br>
          <strong>Country:</strong> ${service.country}<br>
          <strong>Start Date:</strong> ${service.date_start}<br>
          <strong>End Date:</strong> ${service.date_end}<br>
          <strong>Status:</strong> ${service.state}<br>
          <strong>Owner:</strong> ${service.replica_owner_name_id}
        </p>
      </div>
      <br>

    `;

    servicesContainer.appendChild(serviceItem);
  });
}

function createLoadMoreButton() {
  const loadMoreButton = document.createElement('button');
  loadMoreButton.textContent = 'Load More';
  loadMoreButton.className = 'btn btn-primary mt-3'; // Agregar clases de Bootstrap para estilo

  loadMoreButton.addEventListener('click', () => {
    currentIndex += 9;
    populateServices(allServices.slice(currentIndex, currentIndex + 9));
    if (currentIndex + 9 < allServices.length) {
      createLoadMoreButton(); // Crear el botón nuevamente si hay más servicios
    } else {
      removeLoadMoreButton(); // Eliminar el botón si no hay más servicios
    }
    createBackButton(); // Agregar el botón "Back" después de cargar más servicios
  });

  document.getElementById('load-more-container').innerHTML = ''; // Limpiar botones anteriores
  document.getElementById('load-more-container').appendChild(loadMoreButton);
}

function createBackButton() {
  const backButton = document.createElement('button');
  backButton.textContent = 'Back';
  backButton.className = 'btn btn-secondary mt-3'; // Agregar clases de Bootstrap para estilo

  backButton.addEventListener('click', () => {
    currentIndex -= 9;
    populateServices(allServices.slice(currentIndex, currentIndex + 9));
    createLoadMoreButton(); // Agregar el botón "Load More" después de volver atrás
  });

  document.getElementById('load-more-container').innerHTML = ''; // Limpiar botones anteriores
  document.getElementById('load-more-container').appendChild(backButton);
}

function removeLoadMoreButton() {
  document.getElementById('load-more-container').innerHTML = ''; // Limpiar el contenedor de botones
}

window.addEventListener('load', navmenuScrollspy);
document.addEventListener('scroll', navmenuScrollspy);

})(); 













// Función para manejar el envío del formulario desde el modal
function handleFormSubmit() {
  // Evento que se dispara cuando se envía el formulario
  document.getElementById('imageForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar el envío por defecto del formulario

      // Obtener los valores del formulario
      let code = document.getElementById('code').value;
      let receivedDate = document.getElementById('received_date').value;
      let photoUrl = document.getElementById('photo_url').value;
      let userId = document.getElementById('user_id').value;
      let requiredRestore = document.querySelector('input[name="required_restore"]:checked').value === "true";

      // Construir el objeto con los datos
      let data = {
          "code": code,
          "received_date": receivedDate,
          "user_id": userId,
          "required_restore": requiredRestore,
          "photo_url": photoUrl
      };

      // Realizar la petición fetch para enviar los datos al backend
      fetch('http://localhost:8080/replica/create', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => {
          console.log('Fetch response:', response); // Log para verificar la respuesta
          if (!response.ok) {
              throw new Error('Hubo un problema al registrar la imagen.');
          }
          return response.json();
      })
      .then(response => {
          console.log('Response JSON:', response); // Log para verificar el JSON de la respuesta
          // Mostrar notificación de éxito
          showNotification(response.message, 'success');
          // Cerrar el modal después de enviar los datos
          var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
          modal.hide();
          setTimeout(() => {
              window.location.reload(); // Recargar la página después de crear la réplica
          }, 2000); // Espera 2 segundos antes de recargar (opcional)
      })
      .catch(error => {
          console.error('Error al registrar la imagen:', error);
          // Mostrar notificación de error solo si realmente hubo un error de red o similar
          if (error.message === 'Hubo un problema al registrar la imagen.') {
              showNotification('Error al registrar la réplica. Por favor, intenta nuevamente.', 'error');
          }
      });
  });
}

// Función para mostrar notificaciones
function showNotification(message, type) {
  // Aquí puedes implementar la lógica para mostrar una notificación,
  // como usar librerías de notificaciones como Bootstrap Toasts, SweetAlert, etc.
  alert(message); // Ejemplo básico con alert
}

// Llama a la función cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
  handleFormSubmit();
});





// Función para inicializar el Datepicker de Bootstrap
function initializeDatepicker() {
  $('#date_start').datepicker({
    format: 'dd-mm-yyyy',
    autoclose: true,
    todayHighlight: true
  });

  $('#date_end').datepicker({
    format: 'dd-mm-yyyy',
    autoclose: true,
    todayHighlight: true
  });
}

// Función para manejar el envío del formulario desde el modal
function handleFormSubmit() {
  // Evento que se dispara cuando se envía el formulario
  document.getElementById('pilgrimageForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío por defecto del formulario

    // Obtener los valores del formulario
    let dateStart = document.getElementById('date_start').value;
    let dateEnd = document.getElementById('date_end').value;
    let intention = document.getElementById('intention').value;
    let userId = parseInt(document.getElementById('user_id').value);
    let replicaId = parseInt(document.getElementById('replica_id').value);
    let receiverUserId = parseInt(document.getElementById('receiver_user_id').value);

    // Construir el objeto con los datos
    let data = {
      "date_start": formatDate(dateStart),
      "date_end": formatDate(dateEnd),
      "intention": intention,
      "user_id": userId,
      "replica_id": replicaId,
      "receiver_user_id": receiverUserId
    };

    // Realizar la petición fetch para enviar los datos al backend
    fetch('http://localhost:8080/pilgrimage/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      console.log('Fetch response:', response); // Log para verificar la respuesta
      if (!response.ok) {
        throw new Error('Hubo un problema al registrar la peregrinación.');
      }
      return response.json();
    })
    .then(response => {
      console.log('Response JSON:', response); // Log para verificar el JSON de la respuesta
      // Mostrar notificación de éxito
      showNotification(response.message, 'success');
      // Cerrar el modal después de enviar los datos
      var modal = new bootstrap.Modal(document.getElementById('createPilgrimageModal'));
      modal.hide();
      setTimeout(() => {
        window.location.reload(); // Recargar la página después de crear la peregrinación (opcional)
      }, 2000); // Espera 2 segundos antes de recargar
    })
    .catch(error => {
      console.error('Error al registrar la peregrinación:', error);
      // Mostrar notificación de error solo si realmente hubo un error de red o similar
      if (error.message === 'Hubo un problema al registrar la peregrinación.') {
        showNotification('Error al registrar la peregrinación. Por favor, intenta nuevamente.', 'error');
      }
    });
  });
}

// Función para formatear la fecha al formato ISO 8601 (yyyy-MM-dd)
function formatDate(dateString) {
  let [day, month, year] = dateString.split('-');
  return `${year}-${month}-${day}`;
}

// Función para mostrar notificaciones (puedes personalizarla según tu implementación)
function showNotification(message, type) {
  alert(message); // Ejemplo básico con alert, puedes usar otra librería de notificaciones aquí
}

// Llama a las funciones necesarias cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
  initializeDatepicker(); // Inicializar el Datepicker de Bootstrap
  handleFormSubmit(); // Manejar el envío del formulario
});


// Inicializa y agrega el mapa
function initMap() {
  // La ubicación que quieres mostrar
  var location = { lat: -34.603722, lng: -58.381592 }; // Coordenadas de ejemplo (Buenos Aires, Argentina)
  
  // El mapa, centrado en la ubicación
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: location
  });
  
  // El marcador, posicionado en la ubicación
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: 'Nuestra Ubicación'
  });

  // Agrega un evento de clic al marcador para abrir Google Maps en una nueva pestaña
  google.maps.event.addListener(marker, 'click', function() {
    window.open('https://www.google.com/maps?q=' + location.lat + ',' + location.lng);
  });
}



 // Inicializa y agrega el mapa
 function initMap() {
  // La ubicación que quieres mostrar
  var location = { lat: -34.603722, lng: -58.381592 }; // Coordenadas de ejemplo (Buenos Aires, Argentina)
  
  // El mapa, centrado en la ubicación
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: location
  });
  
  // El marcador, posicionado en la ubicación
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: 'Nuestra Ubicación'
  });

  // Agrega un evento de clic al marcador para abrir Google Maps en una nueva pestaña
  google.maps.event.addListener(marker, 'click', function() {
    window.open('https://www.google.com/maps?q=' + location.lat + ',' + location.lng);
  });
}






document.addEventListener('DOMContentLoaded', function () {
  const contactDetailsElement = document.getElementById('contactDetails');
  const editContactForm = document.getElementById('editContactForm');

  // Función para cargar los detalles del contacto
  function loadContactDetails() {
      fetch('http://localhost:8080/contacts/1')
          .then(response => response.json())
          .then(data => {
              const contactHtml = `
                  <div class="col-md-6">
                      <div class="info-item" data-aos="fade" data-aos-delay="200">
                          <i class="bi bi-geo-alt"></i>
                          <h3>Address</h3>
                          <p>${data.direccion}</p>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="info-item" data-aos="fade" data-aos-delay="300">
                          <i class="bi bi-telephone"></i>
                          <h3>Call Us</h3>
                          <p>${data.telefono1}</p>
                          <p>${data.telefono2}</p>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="info-item" data-aos="fade" data-aos-delay="400">
                          <i class="bi bi-envelope"></i>
                          <h3>Email Us</h3>
                          <p>${data.email}</p>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="info-item" data-aos="fade" data-aos-delay="500">
                          <i class="bi bi-clock"></i>
                          <h3>Open Hours</h3>
                          <p>${data.diasHabiles}</p>
                          <p>${data.horarioHabil}</p>
                      </div>
                  </div>
              `;
              contactDetailsElement.innerHTML = contactHtml;

              // Llenar el formulario de edición con los datos actuales
              document.getElementById('editDireccion').value = data.direccion;
              document.getElementById('editTelefono1').value = data.telefono1;
              document.getElementById('editTelefono2').value = data.telefono2 || '';
              document.getElementById('editEmail').value = data.email;
              document.getElementById('editDiasHabiles').value = data.diasHabiles;
              document.getElementById('editHorarioHabil').value = data.horarioHabil;
          })
          .catch(error => {
              console.error('Error fetching contact details:', error);
          });
  }

  // Cargar los detalles del contacto cuando la página se carga
  loadContactDetails();

  // Evento para enviar el formulario de edición
  editContactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = new FormData(editContactForm);
      const editedContact = {
          direccion: formData.get('direccion'),
          telefono1: formData.get('telefono1'),
          telefono2: formData.get('telefono2'),
          email: formData.get('email'),
          diasHabiles: formData.get('diasHabiles'),
          horarioHabil: formData.get('horarioHabil')
      };

      fetch('http://localhost:8080/contacts/1', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedContact)
      })
      .then(response => response.json())
      .then(() => {
          // Recargar los detalles del contacto después de la edición
          loadContactDetails();
          // Cerrar el modal de edición
          const modal = new bootstrap.Modal(document.getElementById('editContactModal'));
          modal.hide();
      })
      .catch(error => {
          console.error('Error editing contact:', error);
          // Aquí podrías mostrar un mensaje de error al usuario si la edición falla
      });
  });

  // Evento al abrir el modal de edición para cargar los datos actuales
  document.getElementById('editContactButton').addEventListener('click', function () {
      fetch('http://localhost:8080/contacts/1')
          .then(response => response.json())
          .then(data => {
              // Llenar el formulario de edición con los datos actuales
              document.getElementById('editDireccion').value = data.direccion;
              document.getElementById('editTelefono1').value = data.telefono1;
              document.getElementById('editTelefono2').value = data.telefono2 || '';
              document.getElementById('editEmail').value = data.email;
              document.getElementById('editDiasHabiles').value = data.diasHabiles;
              document.getElementById('editHorarioHabil').value = data.horarioHabil;
          })
          .catch(error => {
              console.error('Error fetching contact details for editing:', error);
          });
  });
});






document.addEventListener('DOMContentLoaded', function() {
  const recentPostsContainer = document.getElementById('recent-posts').querySelector('.row');

  fetch('http://localhost:8080/blogposts') // Cambia la URL a la que corresponda para obtener tus posts
    .then(response => response.json())
    .then(posts => {
      // Filtrar y obtener los últimos 3 posts activos
      const activePosts = posts.filter(post => post.status === true);
      const lastThreePosts = activePosts.slice(-3).reverse(); // Obtener los últimos 3 y revertir el orden para mostrar el más reciente primero
      
      // Iterar sobre los últimos 3 posts activos
      lastThreePosts.forEach(post => {
        const postElement = createRecentPostElement(post);
        recentPostsContainer.appendChild(postElement);
      });
    })
    .catch(error => console.error('Error fetching recent posts:', error));

  function createRecentPostElement(post) {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-xl-4', 'col-md-6');
    colDiv.setAttribute('data-aos', 'fade-up');

    const article = document.createElement('article');

    const postImgDiv = document.createElement('div');
    postImgDiv.classList.add('post-img');
    const img = document.createElement('img');
    img.src = post.imageUrl || 'assets/img/default-image.jpg'; // Cambia por tu imagen por defecto
    img.alt = '';
    img.classList.add('img-fluid');
    postImgDiv.appendChild(img);

    const postCategoryP = document.createElement('p');
    postCategoryP.classList.add('post-category');
    postCategoryP.textContent = 'Category'; // Aquí puedes añadir la categoría si lo deseas

    const titleH2 = document.createElement('h2');
    titleH2.classList.add('title');
    const titleLink = document.createElement('a');
    titleLink.href = '#';
    titleLink.textContent = post.title;
    titleLink.addEventListener('click', function(event) {
      event.preventDefault();
      showPostInModal(post);
    });
    titleH2.appendChild(titleLink);

    const authorDiv = document.createElement('div');
    authorDiv.classList.add('d-flex', 'align-items-center');
    const authorImg = document.createElement('img');
    authorImg.src = 'assets/img/blog/blog-author.jpg'; // Cambia por tu imagen de autor
    authorImg.alt = '';
    authorImg.classList.add('img-fluid', 'post-author-img', 'flex-shrink-0');
    authorDiv.appendChild(authorImg);

    const postMetaDiv = document.createElement('div');
    postMetaDiv.classList.add('post-meta');
    const postAuthorP = document.createElement('p');
    postAuthorP.classList.add('post-author');
    postAuthorP.textContent = post.autor;
    const postDateP = document.createElement('p');
    postDateP.classList.add('post-date');
    const time = document.createElement('time');
    time.dateTime = post.createdAt;
    time.textContent = new Date(post.createdAt).toLocaleDateString();
    postDateP.appendChild(time);
    postMetaDiv.appendChild(postAuthorP);
    postMetaDiv.appendChild(postDateP);

    authorDiv.appendChild(postMetaDiv);

    article.appendChild(postImgDiv);
    article.appendChild(postCategoryP);
    article.appendChild(titleH2);
    article.appendChild(authorDiv);

    colDiv.appendChild(article);

    return colDiv;
  }

  function showPostInModal(post) {
    // Implementa la lógica para mostrar el modal si lo necesitas
    console.log('Post clicked:', post.title);
  }
});
