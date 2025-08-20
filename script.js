
document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('symptomsForm');
    const painSlider = document.getElementById('painLevel');
    const painValue = document.getElementById('painLevel-value');
    const painDescription = document.getElementById('painLevel-description');
    const textarea = document.getElementById('additionalInfo');
    const charCounter = document.getElementById('additionalInfo-counter');
    const successMessage = document.getElementById('successMessage'); 

    // 2.  Pain Description// Deescripcion del dolor 
     const painDescriptions = [
        '', 
        'Sin dolor',
        'Dolor muy leve',
        'Dolor leve',
        'Molestia moderada',
        'Dolor moderado',
        'Dolor moderado-intenso',
        'Dolor intenso',
        'Dolor muy intenso',
        'Dolor severo',
        'Dolor insoportable'
    ];
    // 3. Update pain slider // Actualizar slider de dolor 
     function updatePainLevel() {
        const level = parseInt(painSlider.value);
        painValue.textContent = level;
        painDescription.textContent = painDescriptions[level];
    }
    painSlider.addEventListener('input', updatePainLevel);

    // 4. Character Counter // Contador de cárecteres
    function updateCharCount() {
        const currentLength = textarea.value.length;
        const maxLength = 500;
        charCounter.textContent = `${currentLength}/${maxLength} caracteres`;
    }
    textarea.addEventListener('input', updateCharCount);

    // 5. Validation functions //Funciónes de validación 
      function showError(fieldName, message) {
        const errorElement = document.getElementById(fieldName + '-error');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
    
    function hideError(fieldName) {
        const errorElement = document.getElementById(fieldName + '-error');
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }
    
    function validateName(name) {
        name = name.trim();

        if (name === '') {
            return 'El nombre es obligatorio';
        }
        if (name.length < 2) {
            return 'El nombre debe tener al menos 2 caracteres';
        }
        return null;
    }
    
    function validateAge(age) {
        const ageNum = parseInt(age);
        if (isNaN(ageNum)) {
            return 'La edad debe ser un número';
        }
        
        if (ageNum < 0 || ageNum > 120) {
            return 'La edad debe estar entre 0 y 120 años';
        }
        
        return null;
    }
    
    function validateSymptoms() {
        const checkedSymptoms = document.querySelectorAll('input[name="symptoms"]:checked');
        
        if (checkedSymptoms.length === 0) {
            return 'Debes seleccionar al menos un síntoma';
        }
        
        return null;
    }

    // 6. Form Validation // Validación del formulario
     function validateForm() {
        let isValid = true;
        const name = document.getElementById('patientName').value;
        const age = document.getElementById('patientAge').value;
        
        const nameError = validateName(name);
        if (nameError) {
            showError('patientName', nameError);
            isValid = false;
        } else {
            hideError('patientName');
        }
        const ageError = validateAge(age);
        if (ageError) {
            showError('patientAge', ageError);
            isValid = false;
        } else {
            hideError('patientAge');
        }
        const symptomsError = validateSymptoms();
        if (symptomsError) {
            showError('symptoms', symptomsError);
            isValid = false;
        } else {
            hideError('symptoms');
        }
        
        return isValid;
    }
    
    // 7. Collect form data // Recopilacionde datos del formulario
    function collectFormData() {
        const formData = {};

        formData.patientName = document.getElementById('patientName').value.trim();
        formData.patientAge = parseInt(document.getElementById('patientAge').value);

        const checkedSymptoms = document.querySelectorAll('input[name="symptoms"]:checked');
        formData.symptoms = [];

        checkedSymptoms.forEach(function(checkbox) {
            formData.symptoms.push(checkbox.value);
        });

        formData.painLevel = parseInt(painSlider.value);
        formData.additionalInfo = textarea.value.trim();
        formData.timestamp = new Date().toISOString();
        return formData;
    }

    // 8.S  Succes message // Mnesaje de exito
     function showSuccessMessage(data) {
        form.style.display = 'none';
        successMessage.classList.add('show');
        window.scrollTo(0, 0);
        setTimeout(function() {
            form.style.display = 'block';
            successMessage.classList.remove('show');
            form.reset(); 
            updatePainLevel(); 
            updateCharCount();
        }, 5000);
    }
    // 9. Sending form // Envio del formulario
    function handleFormSubmit(event) {
        event.preventDefault();

        if (!validateForm()) {
            return; 
        }
        const formData = collectFormData();
        console.log('', formData);
        showSuccessMessage(formData);
    }
    form.addEventListener('submit', handleFormSubmit);

    // 10. Clean Form // Limpiar Formulrio
    function handleFormReset() {
        const errorElements = document.querySelectorAll('.form__error');
        errorElements.forEach(function(error) {
            error.classList.remove('show');
            error.textContent = '';
        });
        setTimeout(function() {
            updatePainLevel();
            updateCharCount();
        }, 10);
    }

    form.addEventListener('reset', handleFormReset);
    
    // 11. Initialization // Inicilización
    updatePainLevel();
    updateCharCount();
    console.log(' ROMI - Sistema de registro de síntomas inicializado correctamente');
});