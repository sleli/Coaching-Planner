# Coaching Planner — Product Requirements Document

**Author:** Archetipo
**Date:** 2026-05-05
**Version:** 1.0

---

## Elevator Pitch

> Coaching Planner aiuta una societa di consulenza e coaching a gestire clienti, commesse, carichi di lavoro, ore consuntivate e rimborsi trasferta in un unico sistema operativo.
>
> For **societa di consulenza e coaching**, who has the problem of **gestire ore, commesse e rimborsi con strumenti frammentati**, **Coaching Planner** is a **web app gestionale interna** that **rende visibili in tempo reale le ore lavorate, il budget delle commesse e i rimborsi mensili**. Unlike **fogli di calcolo e scambi manuali**, our product **collega backoffice e frontoffice in un flusso unico, semplice e verificabile**.

---

## Vision

Diventare lo strumento operativo quotidiano con cui soci e freelance controllano in modo semplice, tempestivo e affidabile le ore lavorate, l'avanzamento delle commesse e i rimborsi di trasferta.

### Product Differentiator

Coaching Planner si concentra sul controllo delle ore fatte, non sulla marginalita completa. Il prodotto riduce il lavoro amministrativo dei soci e rende i freelance autonomi nell'inserimento e nella verifica delle proprie ore mensili.

---

## User Personas

### Persona 1: Marta

**Role:** Socia e responsabile operativo
**Age:** 42 | **Background:** Partner di una societa di consulenza e coaching, coordina clienti, commesse e collaboratori freelance.

**Goals:**
- Vedere rapidamente ore lavorate per collaboratore, cliente e commessa.
- Capire se una commessa sta superando il budget ore previsto.
- Tenere sotto controllo i rimborsi di trasferta mensili.
- Ridurre il tempo speso a consolidare fogli e messaggi.

**Pain Points:**
- Dati ore distribuiti tra file, email e messaggi.
- Visibilita tardiva sugli sforamenti delle commesse.
- Rimborsi gestiti manualmente con criteri non sempre uniformi.
- Difficolta a chiudere il mese se i freelance non hanno aggiornato le ore.

**Behaviors & Tools:**
- Usa fogli di calcolo, email, calendario e strumenti amministrativi.
- Controlla i dati soprattutto a fine mese.
- Ha bisogno di report chiari piu che di configurazioni complesse.

**Motivations:** Avere controllo operativo senza introdurre un gestionale pesante.
**Tech Savviness:** Media.

#### Customer Journey — Marta

| Phase | Action | Thought | Emotion | Opportunity |
|---|---|---|---|---|
| Awareness | Nota che il consolidamento ore richiede troppo tempo. | "Stiamo perdendo controllo sui dati operativi." | Frustrazione | Posizionare il prodotto come centro unico per ore e commesse. |
| Consideration | Valuta una soluzione interna leggera. | "Mi serve qualcosa che i freelance usino davvero." | Cautela | Mostrare inserimento ore semplice e report immediati. |
| First Use | Crea clienti, commesse, budget ore e tier rimborsi. | "Se imposto bene il backoffice, il mese sara piu semplice." | Controllo | Onboarding guidato per configurazioni iniziali. |
| Regular Use | Consulta report e warning su sforamenti. | "So dove siamo prima della chiusura." | Fiducia | Dashboard operativa con warning evidenti. |
| Advocacy | Propone di usare il sistema come standard aziendale. | "Questo deve diventare il nostro metodo." | Sicurezza | Esportazioni e report ricorrenti consolidano l'adozione. |

---

### Persona 2: Luca

**Role:** Freelance consulente/coach
**Age:** 36 | **Background:** Collabora su piu clienti e commesse, alternando attivita da remoto e trasferte.

**Goals:**
- Inserire rapidamente le ore lavorate sulle commesse corrette.
- Vedere in tempo reale quante ore ha fatto nel mese.
- Correggere eventuali errori di inserimento.
- Registrare i rimborsi trasferta secondo i tier definiti.

**Pain Points:**
- Dimentica di aggiornare le ore durante il mese.
- Non ha sempre chiaro il totale mensile aggiornato.
- Deve ricostruire le attivita a fine mese.
- Vuole evitare ambiguita sui rimborsi.

**Behaviors & Tools:**
- Usa calendario, email e strumenti di collaborazione.
- Inserisce spesso le ore in blocco dopo le sessioni con i clienti.
- Preferisce interfacce rapide, con pochi campi e feedback immediato.

**Motivations:** Essere autonomo e ridurre attriti amministrativi.
**Tech Savviness:** Media.

#### Customer Journey — Luca

| Phase | Action | Thought | Emotion | Opportunity |
|---|---|---|---|---|
| Awareness | Riceve richiesta di usare Coaching Planner per le ore. | "Spero non sia un altro strumento complicato." | Scetticismo | Accesso frontoffice essenziale e chiaro. |
| Consideration | Verifica le commesse assegnate. | "Devo trovare subito dove inserire le ore." | Attenzione | Lista commesse filtrata e ordinata. |
| First Use | Inserisce ore e rimborso trasferta. | "Ci metto poco, posso farlo anche a fine giornata." | Sollievo | Form breve con riepilogo immediato. |
| Regular Use | Controlla totale ore mensile e distribuzione per commessa. | "So quanto ho lavorato e dove." | Controllo | Dashboard personale mensile. |
| Advocacy | Consiglia ai colleghi di aggiornare le ore prima del reminder. | "Se lo usiamo bene, ci evita rincorse a fine mese." | Collaborazione | Reminder mensile e dati sempre aggiornati. |

---

## Brainstorming Insights

> Key discoveries and alternative directions explored during the inception session.

### Assumptions Challenged

- I collaboratori potrebbero non inserire le ore in modo costante: il prodotto deve prevedere un reminder verso fine mese.
- Le commesse possono superare il budget ore: il sistema deve mostrare un warning, senza bloccare l'inserimento delle ore.
- La metrica prioritaria non e la marginalita completa della commessa, ma le ore fatte.
- Il rimborso trasferta non richiede nel MVP allegati o workflow di nota spese: basta un modello a tier impostato dal backoffice.

### New Directions Discovered

- Dashboard personale per freelance con ore mensili in tempo reale.
- Report backoffice per soci su ore per collaboratore, ore per cliente/commessa e rimborsi mensili.
- Warning operativo sugli sforamenti budget, lasciando comunque liberta di inserimento.
- Gestione centralizzata dei tier di rimborso trasferta per standardizzare i calcoli.

---

## Product Scope

### MVP — Minimum Viable Product

- Backoffice per soci con gestione clienti.
- Backoffice per soci con gestione commesse e budget ore previsto.
- Gestione collaboratori freelance.
- Frontoffice per inserimento ore su commesse.
- Ore definitive subito e modificabili dal collaboratore.
- Dashboard personale collaboratore con totale ore mensili e dettaglio per commessa.
- Warning quando le ore consuntivate superano il budget della commessa.
- Gestione tier rimborsi trasferta configurati dal backoffice.
- Inserimento rimborsi trasferta da parte del collaboratore usando i tier disponibili.
- Report ore per collaboratore.
- Report ore per cliente/commessa.
- Report rimborsi per mese.
- Reminder verso fine mese per completare l'inserimento ore.

### Growth Features (Post-MVP)

- Esportazione report in CSV/XLSX.
- Storico modifiche delle ore inserite.
- Filtri avanzati per periodo, cliente, commessa e collaboratore.
- Configurazione frequenza reminder.
- Notifiche email o in-app per dati mancanti.
- Stato di chiusura mese per congelare i dati dopo revisione.

### Vision (Future)

- Pianificazione capacita futura per collaboratore.
- Forecast sforamento commesse.
- Integrazione calendario per suggerire ore da consuntivare.
- Allegati per rimborsi spese e nota spese completa.
- Analisi economica e marginalita commessa, se il business decidera di estendere il focus oltre le ore fatte.

---

## Technical Architecture

> **Proposed by:** Leonardo (Architect)

### System Architecture

Coaching Planner sara realizzato come applicazione web full-stack basata sul boilerplate esistente. L'app usera Next.js App Router per pagine backoffice e frontoffice, Server Components e Server Actions/API routes per operazioni dati, Prisma per l'accesso al database Supabase PostgreSQL e Supabase Auth per autenticazione e sessioni.

**Architectural Pattern:** Modular Monolith

**Main Components:**
- Backoffice soci: clienti, commesse, collaboratori, tier rimborsi, report.
- Frontoffice freelance: timesheet, rimborsi, riepilogo mensile.
- Domain layer: moduli applicativi per clienti, commesse, ore, rimborsi e report.
- Data layer: Prisma models e query centralizzate.
- Auth/session layer: estensione del boilerplate Supabase gia presente.
- Notification/reminder layer: job schedulato o automazione periodica per reminder di fine mese.

### Technology Stack

| Layer | Technology | Version | Rationale |
|---|---|---|---|
| Language | TypeScript | 5.x | Tipizzazione coerente tra UI, logica server e accesso dati. |
| Backend Framework | Next.js App Router | 15.x | Il boilerplate esistente usa Next.js 15 con App Router e consente una web app full-stack semplice da mantenere. |
| Frontend Framework | React via Next.js | 19.x compatible with Next.js 15 | Gia integrato nel progetto, adatto a dashboard backoffice/frontoffice. |
| Database | Supabase PostgreSQL | PostgreSQL 15+ / Supabase managed | Database relazionale adatto a clienti, commesse, utenti, ore e rimborsi. |
| ORM | Prisma | 6.x, aligned to project package | Accesso dati tipizzato e schema evolvibile. |
| Auth | Supabase Auth | Managed | OAuth GitHub/Google e session management gia configurati nel boilerplate. |
| Testing | Vitest/React Testing Library o Playwright | Da aggiungere se non presente | Test mirati su logica dominio, report e flussi critici UI. |

### Project Structure

**Organizational pattern:** Feature-oriented modular monolith inside existing Next.js `src/` structure.

```
src/
  app/
    dashboard/
    backoffice/
      clients/
      projects/
      collaborators/
      reimbursement-tiers/
      reports/
    frontoffice/
      timesheet/
      expenses/
      monthly-summary/
  components/
    backoffice/
    frontoffice/
    ui/
  lib/
    prisma.ts
    supabase/
    auth/
    domain/
      clients.ts
      projects.ts
      collaborators.ts
      time-entries.ts
      expenses.ts
      reports.ts
prisma/
  schema.prisma
docs/
  PRD.md
```

### Development Environment

Sviluppo locale su Next.js 15 con Turbopack, Supabase project configurato, Prisma collegato al database PostgreSQL Supabase e Tailwind CSS v4 con shadcn/ui.

**Required tools:** Node.js, npm, Next.js CLI, Prisma CLI, Supabase project, variabili `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `DATABASE_URL`.

### CI/CD & Deployment

**Build tool:** Next.js build con Turbopack in sviluppo e pipeline standard Next.js per produzione.

**Pipeline:** installazione dipendenze, lint/typecheck, Prisma generate, test, build Next.js.

**Deployment:** Vercel per applicazione Next.js; Supabase managed per database, auth e storage.

**Target infrastructure:** Vercel + Supabase.

### Architecture Decision Records (ADR)

- ADR-001: Usare il boilerplate esistente. This project uses an existing boilerplate with auth, database, and UI already configured. Rebuilding would waste time and introduce inconsistencies.
- ADR-002: Usare Modular Monolith invece di microservizi per ridurre complessita operativa e velocizzare MVP.
- ADR-003: Usare Prisma su Supabase PostgreSQL per modellare il dominio gestionale con relazioni chiare.
- ADR-004: Non introdurre workflow di approvazione ore nel MVP perche le ore sono definitive subito e modificabili dal collaboratore.
- ADR-005: Gestire rimborsi trasferta tramite tier configurati dal backoffice, senza allegati o note spese complete nel MVP.

---

## Functional Requirements

### Backoffice

**FR1 — Gestione clienti**  
I soci devono poter creare, visualizzare, modificare e disattivare clienti.

**FR2 — Gestione commesse**  
I soci devono poter creare, visualizzare, modificare e chiudere commesse associate a un cliente.

**FR3 — Budget ore commessa**  
Ogni commessa deve poter avere un budget ore previsto configurato dal backoffice.

**FR4 — Gestione collaboratori freelance**  
I soci devono poter gestire l'elenco dei collaboratori freelance e associarli alle commesse rilevanti. Extends existing boilerplate: User model and authenticated dashboard.

**FR5 — Gestione tier rimborsi trasferta**  
I soci devono poter configurare tier di rimborso basati sulla distanza dal cliente.

**FR6 — Report ore per collaboratore**  
I soci devono poter consultare il totale ore per collaboratore su un periodo selezionato.

**FR7 — Report ore per cliente e commessa**  
I soci devono poter consultare ore consuntivate per cliente e per singola commessa.

**FR8 — Report rimborsi mensili**  
I soci devono poter consultare i rimborsi trasferta aggregati per mese, collaboratore e commessa.

**FR9 — Warning sforamento budget**  
Il sistema deve mostrare un warning quando le ore consuntivate su una commessa superano il budget ore previsto, senza bloccare ulteriori inserimenti.

### Frontoffice

**FR10 — Inserimento ore su commessa**  
Il collaboratore freelance deve poter inserire ore lavorate indicando data, commessa e quantita ore.

**FR11 — Modifica ore inserite**  
Il collaboratore deve poter modificare le proprie ore gia inserite, poiche le ore sono definitive subito ma correggibili.

**FR12 — Riepilogo mensile collaboratore**  
Il collaboratore deve poter vedere in tempo reale il totale ore fatte nel mese corrente.

**FR13 — Dettaglio ore per commessa**  
Il collaboratore deve poter vedere la distribuzione delle proprie ore mensili sulle diverse commesse.

**FR14 — Inserimento rimborso trasferta**  
Il collaboratore deve poter registrare un rimborso trasferta selezionando cliente/commessa e tier di rimborso disponibile.

**FR15 — Reminder fine mese**  
Il sistema deve inviare o mostrare un reminder verso fine mese per ricordare ai collaboratori di completare l'inserimento ore.

**FR16 — Accesso differenziato per soci e collaboratori**  
Il sistema deve distinguere le aree accessibili ai soci e ai collaboratori freelance. Tutti i soci hanno gli stessi permessi nel MVP. Extends existing boilerplate: session management middleware and route protection.

---

## Non-Functional Requirements

### Security

- Accesso consentito solo a utenti autenticati.
- Separazione autorizzativa tra soci e collaboratori freelance.
- I collaboratori possono vedere e modificare solo le proprie ore e i propri rimborsi.
- I soci possono accedere ai dati backoffice e ai report aziendali.
- Le query server-side devono validare permessi e ownership dei dati, senza affidarsi solo alla UI.
- Le credenziali e le chiavi Supabase/Database devono restare in variabili ambiente.

### Integrations

- Supabase Auth per autenticazione e gestione sessione, gia presente nel boilerplate.
- Supabase PostgreSQL come database applicativo tramite Prisma.
- Supabase Storage disponibile per future estensioni, ad esempio allegati rimborsi o documenti cliente.
- Possibile integrazione futura con email provider o job scheduler per reminder di fine mese.

---

## Next Steps

1. **UX Design** — Define detailed interaction flows and wireframes for MVP features
2. **Detailed Architecture** — Deepen technical decisions on critical areas
3. **Backlog** — Decompose functional requirements into epics and user stories
4. **Validation** — Review with stakeholders and test the riskiest business assumptions

---

_PRD generated via Archetipo Product Inception — 2026-05-05_
_Session conducted by: smare with the Archetipo team_
