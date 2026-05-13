<template>
    <footer class="site-footer">
        <div class="container">
            <div class="footer-top">
                <div class="row">
                    <div class="col-lg-4 mb-4 mb-lg-0">
                        <div class="footer-brand">
                            <img src="@/assets/logo/logo_fonts.png" alt="磐石之心" class="footer-logo" />
                        </div>
                        <div class="social-links">
                            <a href="https://www.facebook.com/daansolidrock/?locale=zh_TW" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <i class="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="https://www.youtube.com/@user-vd1mj4li5t" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <i class="fa-brands fa-youtube"></i>
                            </a>
                            <a href="https://www.instagram.com/rockhardfaithchurch_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <h6 class="footer-heading">聚會資訊</h6>
                        <div class="footer-highlight">
                            <i class="fa-regular fa-clock"></i>
                            <span>每週日早上 10:30</span>
                        </div>
                        <ul class="footer-list">
                            <li>
                                <i class="fa-solid fa-location-dot"></i>
                                <span>403台中市西區臺灣大道二段285號22樓</span>
                            </li>
                        </ul>
                    </div>

                    <div class="col-lg-4 col-md-6">
                        <h6 class="footer-heading">聯絡我們</h6>
                        <ul class="footer-list">
                            <li>
                                <i class="fa-solid fa-envelope"></i>
                                <span>daansolidrock@gmail.com</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-phone"></i>
                                <span>0954-030-032</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-pen"></i>
                                <span>統一編號：92263802</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <span>Copyright &copy;2024 &ndash; 磐石之心 All Rights Reserved.</span>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
.site-footer {
    background-color: var(--color-footer-bg);
    color: rgba(255, 255, 255, 0.8);
    padding: 60px 0 0;
}

.footer-top {
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-logo {
    width: 220px;
    max-width: 100%;
    margin-bottom: 20px;
}

.social-links {
    display: flex;
    gap: 12px;

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        font-size: 16px;
        transition: all 0.3s ease;

        &:hover {
            background-color: var(--color-accent);
            border-color: var(--color-accent);
            color: var(--color-footer-bg);
        }
    }
}

.footer-heading {
    font-family: var(--font-serif);
    color: var(--color-accent);
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 20px;
    text-transform: uppercase;
}

.footer-highlight {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    background-color: rgba(201, 169, 78, 0.1);
    border-left: 3px solid var(--color-accent);
    border-radius: 4px;
    margin-bottom: 16px;
    color: white;
    font-weight: 600;
    font-size: 15px;

    i {
        color: var(--color-accent);
    }
}

.footer-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 12px;
        font-size: 14px;
        line-height: 1.6;

        i {
            color: var(--color-accent);
            margin-top: 4px;
            min-width: 16px;
        }
    }
}

.footer-bottom {
    padding: 20px 0;
    text-align: center;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
}

@media screen and (max-width: 767px) {
    .site-footer {
        padding: 40px 0 0;
    }

    .footer-logo {
        width: 180px;
    }
}
</style>
