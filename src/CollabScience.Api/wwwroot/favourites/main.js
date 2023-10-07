document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', () => {
        const field = button.getAttribute('data-edit');
        const span = document.getElementById(field);
        const input = document.getElementById(field + '-input');

        if (button.textContent === 'Edit') {
            span.style.display = 'none';
            input.style.display = 'inline-block';
            button.textContent = 'Save';
        } else {
            span.textContent = input.value;
            span.style.display = 'inline-block';
            input.style.display = 'none';
            button.textContent = 'Edit';
        }
    });
});
