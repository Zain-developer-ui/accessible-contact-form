# Frontend Mentor - Contact Form Solution

This is a solution to the [Contact form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/contact-form--G-hYlqKJj). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- ✅ Complete the form and see a success toast message upon successful submission
- ✅ Receive form validation messages if:
  - A required field has been missed
  - The email address is not formatted correctly
- ✅ Complete the form only using their keyboard
- ✅ Have inputs, error messages, and the success message announced on their screen reader
- ✅ View the optimal layout for the interface depending on their device's screen size
- ✅ See hover and focus states for all interactive elements on the page

### Screenshot

![Desktop Design](./design/desktop-design.jpg)
![Mobile Design](./design/mobile-design.jpg)
![Error State](./design/error-state.jpg)
![Success State](./design/success-state.jpg)

### Links

- Solution URL: [GitHub Repository](https://github.com/yourusername/contact-form-solution)
- Live Site URL: [Live Demo](https://yourusername.github.io/contact-form-solution)

## My process

### Built with

- Semantic HTML5 markup
- CSS Grid and Flexbox
- Mobile-first workflow
- Vanilla JavaScript
- Custom CSS properties
- Accessible form design
- WCAG compliance

### Key Features

- **Fully Accessible**: Screen reader compatible with proper ARIA labels
- **Keyboard Navigation**: Complete form navigation using only keyboard
- **Real-time Validation**: Instant feedback on form inputs
- **Responsive Design**: Works perfectly on mobile (375px) to desktop (1440px+)
- **Custom Components**: Styled radio buttons and checkboxes
- **Success Toast**: Animated success message with auto-hide
- **Error Handling**: Clear error messages with visual indicators

### What I learned

This project helped me master:

1. **Accessible Form Design**:
```html
<input type="email" id="email" name="email" required aria-describedby="email-error">
<div class="error-message" id="email-error" role="alert"></div>
```

2. **Custom Radio Button Styling**:
```css
.radio-option input[type="radio"]:checked::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background: hsl(169, 82%, 27%);
  border-radius: 50%;
}
```

3. **JavaScript Form Validation**:
```js
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

### Design Implementation

- **Colors**: Exact match with style guide (Green 600, Grey 500, Red error states)
- **Typography**: Karla font family with proper weights (400, 700)
- **Layout**: CSS Grid for form rows, Flexbox for radio/checkbox groups
- **Spacing**: Consistent 24px, 16px, 12px spacing system
- **Interactive States**: Hover effects with green accent color

## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- GitHub - [@yourusername](https://github.com/yourusername)

---

## How to Run

1. Clone the repository
2. Open `index.html` in your browser
3. Test the form functionality and responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Note**: This solution uses modern CSS features like CSS Grid and custom properties.
