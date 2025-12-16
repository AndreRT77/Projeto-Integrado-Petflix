/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo javascript do cadastro pet
 * Data:15/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/ 

const API_BASE_URL = 'http://localhost:8080';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-cadastro');
    const inputImagem = document.getElementById('input-imagem');
    const previewContainer = document.querySelector('.preview-container');

    // Preview de imagem
    if (inputImagem) {
        inputImagem.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Limpa preview anterior
                    previewContainer.innerHTML = '';
                    
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.className = 'preview-imagem';
                    previewContainer.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            
            // Aqui você pode converter para JSON se sua API esperar JSON, 
            // ou enviar formData diretamente se for multipart/form-data (para arquivos)
            const dados = Object.fromEntries(formData);

            try {
                console.log('Dados do Pet:', dados);
                // Simulação de delay de rede
                await new Promise(r => setTimeout(r, 1000));
                
                mostrarNotificacao('Pet cadastrado com sucesso!', 'success');
                form.reset();
                previewContainer.innerHTML = ''; // Limpa o preview
                
                // Redirecionamento comentado para teste
                // setTimeout(() => window.location.href = '../adote/index.html', 2000);
            } catch (error) {
                console.error(error);
                mostrarNotificacao('Erro ao cadastrar pet', 'error');
            }
        });
    }

    function mostrarNotificacao(mensagem, tipo) {
        const notificacao = document.createElement('div');
        notificacao.textContent = mensagem;
        notificacao.style.cssText = `
            position: fixed; 
            top: 20px; 
            right: 20px; 
            padding: 15px 25px;
            border-radius: 8px; 
            color: white; 
            z-index: 3000;
            background-color: ${tipo === 'success' ? '#4CAF50' : '#f44336'};
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
            animation: slideIn 0.5s ease-out;
        `;
        document.body.appendChild(notificacao);
        setTimeout(() => {
            notificacao.style.opacity = '0';
            notificacao.style.transition = 'opacity 0.5s';
            setTimeout(() => notificacao.remove(), 500);
        }, 3000);
    }
});