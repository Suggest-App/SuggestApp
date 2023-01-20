import Swal from "sweetalert2";
import { i18n } from '@/i18n'

export function trackingSincePopup(): void {
    const { t } = i18n.global
    Swal.fire({
        title: t('informationPopup.trackingSince.heading'),
        text: t('informationPopup.trackingSince.text'),
        icon: 'question',
        iconColor: '#FA8231',
        background: '#1D1D1D',
        color: '#FFFFFF',
        buttonsStyling: true,
        customClass: 'custom-swal-container',
        confirmButtonColor: '#3bd23b',
        confirmButtonText: t('informationPopup.matches.btn'),
    })
}
export function matchesInformationPopup(): void {
    const { t } = i18n.global
    Swal.fire({
        title: t('informationPopup.matches.heading'),
        text: t('informationPopup.matches.text'),
        icon: 'question',
        iconColor: '#FA8231',
        background: '#1D1D1D',
        color: '#FFFFFF',
        buttonsStyling: true,
        customClass: 'custom-swal-container',
        confirmButtonColor: '#3bd23b',
        confirmButtonText: t('informationPopup.matches.btn'),
    })
}

