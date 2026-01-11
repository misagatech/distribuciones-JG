// ===== VARIABLES GLOBALES =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const header = document.getElementById('header');
const cotizacionForm = document.getElementById('cotizacionForm');

// ===== MENÚ MÓVIL =====
function toggleMobileMenu() {
    mainNav.classList.toggle('active');
    mobileMenuBtn.innerHTML = mainNav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
}

// Cerrar menú al hacer clic en un enlace
function closeMobileMenu() {
    mainNav.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
}

// ===== HEADER SCROLL EFFECT =====
function handleHeaderScroll() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// ===== FORMULARIO DE COTIZACIÓN =====
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Mostrar loading
    const submitBtn = cotizacionForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
    submitBtn.disabled = true;
    
    // Obtener datos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    const producto = document.getElementById('producto').value;
    const mensaje = document.getElementById('mensaje').value.trim();
    const newsletter = document.getElementById('newsletter').checked;
    
    // Validar teléfono colombiano
    const phoneRegex = /^[3]\d{9}$/;
    if (!phoneRegex.test(telefono)) {
        alert('Por favor ingresa un número de teléfono válido de Colombia (ej: 3123456789)');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    // Crear mensaje para WhatsApp
    let whatsappMessage = `Hola Distribuciones JG, soy *${nombre}*.%0A`;
    whatsappMessage += `Estoy interesado en: *${getProductName(producto)}*.%0A`;
    whatsappMessage += `Mi teléfono es: *${telefono}*.%0A`;
    
    if (email) {
        whatsappMessage += `Mi email: ${email}.%0A`;
    }
    
    if (mensaje) {
        whatsappMessage += `Mensaje adicional: ${mensaje}.%0A`;
    }
    
    if (newsletter) {
        whatsappMessage += `*Quiero recibir promociones*.%0A`;
    }
    
    whatsappMessage += `%0A*¡Gracias!*`;
    
    // Crear URL de WhatsApp
    const whatsappURL = `https://wa.me/573138771758?text=${whatsappMessage}`;
    
    // Simular envío (2 segundos)
    setTimeout(() => {
        // Abrir WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Resetear formulario
        cotizacionForm.reset();
        
        // Restaurar botón
        submitBtn.innerHTML = '✓ ¡Enviado!';
        submitBtn.style.background = '#25D366';
        
        // Mostrar notificación
        showNotification('¡Formulario enviado! Redirigiendo a WhatsApp...', 'success');
        
        // Restaurar botón después de 3 segundos
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 2000);
}

// Función auxiliar para obtener nombre del producto
function getProductName(value) {
    const productos = {
        'griferia': 'Grifería',
        'sanitarios': 'Porcelana Sanitaria',
        'lavaplatos': 'Lavaplatos y Accesorios',
        'otros': 'Otros Productos'
    };
    return productos[value] || 'Producto no especificado';
}

// ===== NOTIFICACIONES =====
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className
