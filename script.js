document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successToast = document.getElementById('successToast');
    
    const errorMessages = {
        firstName: 'This field is required',
        lastName: 'This field is required',
        email: {
            required: 'This field is required',
            invalid: 'Please enter a valid email address'
        },
        queryType: 'Please select a query type',
        message: 'This field is required',
        consent: 'To submit this form, please consent to being contacted'
    };
    
    function showError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const formGroup = errorElement.closest('.form-group') || errorElement.closest('fieldset');
        
        errorElement.textContent = message;
        formGroup.classList.add('error');
        
        // Announce error to screen readers
        errorElement.setAttribute('aria-live', 'polite');
    }
    
    function clearError(fieldName) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const formGroup = errorElement.closest('.form-group') || errorElement.closest('fieldset');
        
        errorElement.textContent = '';
        formGroup.classList.remove('error');
        errorElement.removeAttribute('aria-live');
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        
        clearError(fieldName);
        
        if (field.hasAttribute('required') && !value) {
            const message = typeof errorMessages[fieldName] === 'object' 
                ? errorMessages[fieldName].required 
                : errorMessages[fieldName];
            showError(fieldName, message);
            return false;
        }
        
        if (fieldName === 'email' && value && !validateEmail(value)) {
            showError(fieldName, errorMessages.email.invalid);
            return false;
        }
        
        return true;
    }
    
    function validateRadioGroup(name) {
        const radios = document.querySelectorAll(`input[name="${name}"]`);
        const isChecked = Array.from(radios).some(radio => radio.checked);
        
        clearError(name);
        
        if (!isChecked) {
            showError(name, errorMessages[name]);
            return false;
        }
        
        return true;
    }
    
    function validateCheckbox(checkbox) {
        const fieldName = checkbox.name;
        
        clearError(fieldName);
        
        if (checkbox.hasAttribute('required') && !checkbox.checked) {
            showError(fieldName, errorMessages[fieldName]);
            return false;
        }
        
        return true;
    }
    
    function showSuccessToast() {
        successToast.classList.add('show');
        successToast.focus();
        
        setTimeout(() => {
            successToast.classList.remove('show');
        }, 5000);
    }
    
    // Real-time validation
    form.addEventListener('input', function(e) {
        if (e.target.type === 'text' || e.target.type === 'email' || e.target.tagName === 'TEXTAREA') {
            validateField(e.target);
        }
    });
    
    form.addEventListener('change', function(e) {
        if (e.target.type === 'radio') {
            validateRadioGroup(e.target.name);
        } else if (e.target.type === 'checkbox') {
            validateCheckbox(e.target);
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate text inputs
        const textInputs = form.querySelectorAll('input[type="text"], input[type="email"], textarea');
        textInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        // Validate radio groups
        if (!validateRadioGroup('queryType')) {
            isValid = false;
        }
        
        // Validate checkbox
        const consentCheckbox = document.getElementById('consent');
        if (!validateCheckbox(consentCheckbox)) {
            isValid = false;
        }
        
        if (isValid) {
            // Clear form
            form.reset();
            
            // Show success message
            showSuccessToast();
        } else {
            // Focus first error field
            const firstError = form.querySelector('.form-group.error input, fieldset.error input');
            if (firstError) {
                firstError.focus();
            }
        }
    });
    
    // Keyboard navigation for custom radio buttons
    document.addEventListener('keydown', function(e) {
        if (e.target.type === 'radio') {
            const radios = document.querySelectorAll(`input[name="${e.target.name}"]`);
            const currentIndex = Array.from(radios).indexOf(e.target);
            
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % radios.length;
                radios[nextIndex].focus();
                radios[nextIndex].checked = true;
                validateRadioGroup(e.target.name);
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + radios.length) % radios.length;
                radios[prevIndex].focus();
                radios[prevIndex].checked = true;
                validateRadioGroup(e.target.name);
            }
        }
    });
});
