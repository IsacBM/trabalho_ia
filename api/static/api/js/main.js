document.addEventListener('DOMContentLoaded', function() {
    const inputImagem = document.getElementById('imagem');
    const miniPreview = document.getElementById('miniPreview');
    const miniPreviewOverlay = document.getElementById('miniPreviewOverlay');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    
    const rightAguardando = document.getElementById('rightAguardando');
    const largeImageContainer = document.getElementById('largeImageContainer');
    const largeImage = document.getElementById('largeImage');
    const scannerEffect = document.getElementById('scannerEffect');
    
    const btnAnalisar = document.getElementById('btnAnalisar');
    const form = document.getElementById('medicalForm');
    
    const painelLaudo = document.getElementById('painelLaudo');
<<<<<<< HEAD
    const iconeDiagnostico = document.getElementById('iconeDiagnostico');
    const textoDiagnostico = document.getElementById('textoDiagnostico');
    const textoConfianca = document.getElementById('textoConfianca');
=======
    const textoDiagnostico = document.getElementById('textoDiagnostico');
    const textoConfianca = document.getElementById('textoConfianca');
    const csrfElement = document.querySelector('[name=csrfmiddlewaretoken]');
    const csrfToken = csrfElement ? csrfElement.value : '';
>>>>>>> 8cff3ea413ce4a304f2d664eaeaec361566c2ef6

    if (inputImagem) {
        inputImagem.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    uploadPlaceholder.classList.add('hidden');
                    miniPreview.src = e.target.result;
                    miniPreview.classList.remove('hidden');
                    miniPreviewOverlay.classList.remove('hidden');

                    rightAguardando.classList.add('hidden');
                    largeImage.src = e.target.result;
                    largeImageContainer.classList.remove('hidden');
                    
                    painelLaudo.classList.add('hidden');
                    painelLaudo.classList.remove('animate-fade-in');
                }
                reader.readAsDataURL(file);
            }
        });
    }

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const file = inputImagem.files[0];
            if (!file) {
                alert("Por favor, anexe uma captura de fundo de olho primeiro.");
                return;
            }

            btnAnalisar.innerHTML = '<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processando...';
            btnAnalisar.disabled = true;
            scannerEffect.classList.remove('hidden');
            painelLaudo.classList.add('hidden');
            painelLaudo.classList.remove('animate-fade-in');

<<<<<<< HEAD
            const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

=======
>>>>>>> 8cff3ea413ce4a304f2d664eaeaec361566c2ef6
            const formData = new FormData();
            formData.append('imagem', file);

            try {
                const [resposta] = await Promise.all([
                    fetch('/api/diagnostico/', {
                        method: 'POST',
                        headers: { 'X-CSRFToken': csrfToken },
                        body: formData
                    }),
                    new Promise(resolve => setTimeout(resolve, 2000))
                ]);

<<<<<<< HEAD
=======
                if (!resposta.ok) {
                    throw new Error("Falha na resposta do servidor");
                }

>>>>>>> 8cff3ea413ce4a304f2d664eaeaec361566c2ef6
                const dados = await resposta.json();

                scannerEffect.classList.add('hidden');

                textoDiagnostico.innerText = dados.diagnostico;
                textoConfianca.innerText = dados.confianca;

                if (dados.diagnostico === 'Catarata') {
                    textoDiagnostico.className = "text-3xl font-black text-red-600";
<<<<<<< HEAD
                    iconeDiagnostico.className = "w-16 h-16 rounded-full flex items-center justify-center shrink-0 bg-red-100 border-4 border-red-200 text-red-600";
                    iconeDiagnostico.innerHTML = '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>';
                } else {
                    textoDiagnostico.className = "text-3xl font-black text-emerald-600";
                    iconeDiagnostico.className = "w-16 h-16 rounded-full flex items-center justify-center shrink-0 bg-emerald-100 border-4 border-emerald-200 text-emerald-600";
                    iconeDiagnostico.innerHTML = '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
=======
                } 
                
                else {
                    textoDiagnostico.className = "text-3xl font-black text-emerald-600";
>>>>>>> 8cff3ea413ce4a304f2d664eaeaec361566c2ef6
                }

                painelLaudo.classList.remove('hidden');
                painelLaudo.classList.add('animate-fade-in');

            } catch (error) {
                alert("Erro ao conectar com o motor de Inteligência Artificial.");
                scannerEffect.classList.add('hidden');
            } finally {
                btnAnalisar.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Nova Avaliação';
                btnAnalisar.disabled = false;
            }
        });
    }
});
