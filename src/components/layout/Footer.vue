<template>
    <footer class="bg-blue text-white text-center py-5 footer">
        <div class="container">
            <p class="footer-title"><i class="fas fa-film"></i> Movie Night</p>
            <p class="footer-subtitle">Mi lista personal de peliculas por ver</p>
            <div class="footer-social my-3">
                <a href="https://github.com/VictoriaAcunaParedes" target="_blank" data-bs-toggle="tooltip" title="GitHub">
                    <i class="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/victoria-alviento90/" target="_blank" data-bs-toggle="tooltip" title="LinkedIn">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://www.instagram.com/victoria.alviento/" target="_blank" data-bs-toggle="tooltip" title="Instagram">
                    <i class="fab fa-instagram"></i>
                </a>
            </div>

            <small>Movie App - Vue + Firebase - Developed by Victoria Acuña</small>

        </div>
    </footer>
</template>

<script setup></script>

<style scoped>
    .bg-blue {
        background-color: #020617;
    }

    .footer {
        border-top: 3px solid rgba(255,255,255,0.05);
    }

    .footer-title {
        font-weight: 600;
        font-size: 1.2rem;
        margin-bottom: 4px;
    }

    .footer-subtitle {
        font-size: 0.9rem;
        margin-bottom: 10px;
    }

    .footer-social a {
        color: #cbd5e1;
        font-size: 1.4rem;
        margin: 0 10px;
        transition: 0.2s;
    }
</style>