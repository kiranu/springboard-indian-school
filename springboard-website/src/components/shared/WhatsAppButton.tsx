import { useSettings } from '../../hooks/useSettings'

export default function WhatsAppButton() {
  const { settings } = useSettings()
  const whatsappNumber = settings.whatsapp_number || '919XXXXXXXXX'
  const message = 'Hello! I am interested in admissions at Springboard Indian School'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      title="Chat with us on WhatsApp"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.949 1.479c-1.533.867-2.582 2.098-2.582 3.623 0 1.512.926 2.87 2.351 3.788 1.425.918 3.318 1.426 5.426 1.426 1.109 0 2.176-.208 3.154-.613l3.799 1.258-1.01-3.066c.915-1.591 1.44-3.468 1.44-5.453 0-4.933-4.011-8.932-8.953-8.932z" />
      </svg>
    </a>
  )
}
