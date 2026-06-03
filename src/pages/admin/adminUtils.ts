export function formatAdminDate(value?: string | null) {
  if (!value) return '-';

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export function eventLabel(name: string) {
  const labels: Record<string, string> = {
    page_view: 'Pagina vista',
    popup_open: 'Popup aberto',
    popup_submit: 'Lead enviado',
    whatsapp_click: 'Clique no WhatsApp',
  };

  return labels[name] || name;
}

export function leadStatusLabel(name: string) {
  const labels: Record<string, string> = {
    new: 'Novo',
    contacted: 'Em contato',
    scheduled: 'Agendado',
    won: 'Fechado',
    lost: 'Perdido',
  };

  return labels[name] || name;
}
