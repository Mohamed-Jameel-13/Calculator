// script.js
document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    const history = document.getElementById('history');
    const buttons = document.querySelectorAll('.buttons button');
    let currentExpression = '';
    let historyExpression = '';

    // Function to handle basic and scientific calculations
    function calculate(expression) {
        try {
            // Replace symbols with JavaScript-compatible operators
            expression = expression
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/\^/g, '**')
                .replace(/sin/g, 'Math.sin')
                .replace(/cos/g, 'Math.cos')
                .replace(/tan/g, 'Math.tan')
                .replace(/log/g, 'Math.log10')
                .replace(/√/g, 'Math.sqrt')
                .replace(/π/g, Math.PI);

            // Handle percentage calculations
            expression = expression.replace(/(\d+)%/, '($1/100)');

            // Evaluate the expression safely
            return new Function(`return ${expression}`)();
        } catch (error) {
            return 'Error';
        }
    }

    // Add event listeners to all buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === 'C') {
                // Clear the calculator
                currentExpression = '';
                historyExpression = '';
            } else if (value === '⌫') {
                // Backspace functionality
                currentExpression = currentExpression.slice(0, -1);
            } else if (value === '=') {
                // Evaluate the expression
                try {
                    historyExpression = currentExpression;
                    const calculatedValue = calculate(currentExpression);
                    currentExpression = calculatedValue.toString();
                } catch {
                    currentExpression = 'Error';
                }
            } else if (button.classList.contains('sci-btn')) {
                // Handle scientific functions
                if (['sin', 'cos', 'tan', 'log'].includes(value)) {
                    currentExpression += `${value}(`;
                } else if (value === '√') {
                    currentExpression += '√(';
                } else if (value === 'π') {
                    currentExpression += Math.PI.toString();
                }
            } else {
                // Append the button value to the current expression
                currentExpression += value;
            }

            // Update the display
            result.value = currentExpression;
            history.value = historyExpression;
        });
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            try {
                historyExpression = currentExpression;
                const calculatedValue = calculate(currentExpression);
                currentExpression = calculatedValue.toString();
            } catch {
                currentExpression = 'Error';
            }
        } else if (e.key === 'Backspace') {
            currentExpression = currentExpression.slice(0, -1);
        } else if (/[\d\+\-\*\/\(\)\.\%\^]/.test(e.key)) {
            currentExpression += e.key;
        }
        result.value = currentExpression;
    });

    // Animated quotes section
    const quotes = [
        '"Mathematics is the language in which God has written the universe." - Galileo Galilei',
        '"Pure mathematics is, in its way, the poetry of logical ideas." - Albert Einstein',
        '"Without mathematics, there\'s nothing you can do." - Richard P. Feynman',
        '"Mathematics is the music of reason." - James Joseph Sylvester'
    ];

    let quoteIndex = 0;
    const quoteElement = document.querySelector('.quote-text');

    function changeQuote() {
        quoteElement.style.opacity = 0;
        setTimeout(() => {
            quoteElement.textContent = quotes[quoteIndex];
            quoteElement.style.opacity = 1;
            quoteIndex = (quoteIndex + 1) % quotes.length;
        }, 500);
    }

    // Change quotes every 5 seconds
    setInterval(changeQuote, 5000);

    // Dark mode toggle (optional)
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = '🌓';
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.bottom = '20px';
    darkModeToggle.style.right = '20px';
    darkModeToggle.style.background = 'rgba(255, 255, 255, 0.1)';
    darkModeToggle.style.border = 'none';
    darkModeToggle.style.color = '#fff';
    darkModeToggle.style.padding = '10px';
    darkModeToggle.style.borderRadius = '50%';
    darkModeToggle.style.cursor = 'pointer';
    darkModeToggle.style.zIndex = '1000';

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        darkModeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '🌓';
    });

    document.body.appendChild(darkModeToggle);

    // Add light mode styles dynamically
    const lightModeStyles = `
        .light-mode {
            background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
            color: #000;
        }
        .light-mode nav {
            background: rgba(255, 255, 255, 0.8);
        }
        .light-mode .nav-links a {
            color: #000;
        }
        .light-mode .calculator-container {
            background: rgba(0, 0, 0, 0.1);
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        }
        .light-mode button {
            background: rgba(0, 0, 0, 0.1);
            color: #000;
        }
        .light-mode .operator {
            background: rgba(255, 165, 0, 0.3);
        }
        .light-mode .equal {
            background: #00ff88;
            color: #000;
        }
        .light-mode .clear {
            background: #ff4646;
        }
        .light-mode .quote-text {
            color: #000;
        }
        .light-mode .feature {
            background: rgba(0, 0, 0, 0.1);
        }
        .light-mode .contact-form input,
        .light-mode .contact-form textarea {
            background: rgba(0, 0, 0, 0.1);
            color: #000;
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = lightModeStyles;
    document.head.appendChild(styleSheet);
});