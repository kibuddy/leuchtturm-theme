// NEWSLETTER HANDLER - EMAIL SPEICHERN

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletter-signup');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = form.querySelector('input[name="email"]').value;
        const frequency = document.querySelector('input[name="frequency"]:checked')?.value || 'weekly';
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = 'Wird verarbeitet...';
        button.disabled = true;
        
        try {
            // Save to Dashboard API
            const response = await fetch('http://100.92.84.123:3456/api/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    frequency: frequency,
                    source: 'homepage',
                    timestamp: new Date().toISOString()
                })
            });
            
            if (response.ok) {
                button.textContent = '✅ Erfolgreich!';
                button.style.background = '#28a745';
                
                // Show success message
                const successMsg = document.createElement('p');
                successMsg.textContent = `Danke! Du erhältst ${frequency === 'daily' ? 'täglich' : frequency === 'weekly' ? 'wöchentlich' : 'monatlich'} Post von mir.`;
                successMsg.style.color = '#28a745';
                successMsg.style.marginTop = '1rem';
                successMsg.style.fontWeight = '600';
                form.appendChild(successMsg);
                
                // Reset form
                form.querySelector('input[name="email"]').value = '';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    successMsg.remove();
                }, 5000);
            } else {
                throw new Error('Subscription failed');
            }
            
        } catch (error) {
            console.error('Newsletter error:', error);
            button.textContent = '❌ Fehler - bitte nochmal';
            button.style.background = '#dc3545';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 3000);
        }
    });
});
