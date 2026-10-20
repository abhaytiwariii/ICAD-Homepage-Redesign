import { type FormEvent, type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowRight, Atom, BookOpen, Check, ChevronDown, Compass, GraduationCap,
  HeartHandshake, Mail, MapPin, Menu, Microscope, Phone, ShieldCheck, X,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = [
      `Student / parent name: ${form.get('name')}`,
      `Phone number: ${form.get('phone')}`,
      `Student's class: ${form.get('class')}`,
      `Program of interest: ${form.get('program')}`,
      `Preferred center: ${form.get('center')}`,
    ].join('\n');
    window.location.href = `mailto:contact@icadiit.com?subject=${encodeURIComponent('ICAD course enquiry')}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };
  const programs = [
    { id: '01', title: 'JEE', sub: 'Main & Advanced', description: 'Build deep conceptual command for engineering entrance exams.', icon: Atom },
    { id: '02', title: 'NEET', sub: 'Medical entrance', description: 'A structured classroom path through Biology, Physics and Chemistry.', icon: Microscope },
    { id: '03', title: 'MHT-CET', sub: 'State entrance', description: 'Focused preparation for Maharashtra’s engineering admissions test.', icon: Compass },
    { id: '04', title: 'Foundation', sub: 'Classes 8–10', description: 'Strengthen fundamentals early and make room for bigger questions.', icon: BookOpen },
  ];
  const faq = [
    { q: 'Which programs can students explore at ICAD?', a: 'ICAD offers dedicated preparation for JEE Main & Advanced, JEE Main and MHT-CET, NEET, and Foundation classes. Rank Booster is an intensive revision option for students preparing for JEE and NEET.' },
    { q: 'Where are ICAD classrooms located?', a: 'ICAD has centers in Nagpur, Amravati, Chandrapur, Yavatmal, Nashik, Nanded and Chhatrapati Sambhaji Nagar. Contact the admissions team to find the right center and current batch options.' },
    { q: 'How does the CPA scholarship test work?', a: 'CPA is an ICAD scholarship test. Depending on eligibility and results, students may receive fee waivers of up to 90%. Please contact ICAD for the current registration details, terms and test schedule.' },
    { q: 'Can we get the fee structure and installment details?', a: 'Fees vary by program and duration. ICAD says payments may be made in 2 to 4 installments depending on the course; the admissions office can share the current fee structure and applicable scholarship details.' },
    { q: 'Does ICAD offer online coaching?', a: 'ICAD emphasizes physical classroom training for the sustained focus these entrance exams require. Contact a center for current classroom schedules and availability.' },
    { q: 'Who can apply for a Foundation program?', a: 'Eligibility depends on the course. ICAD’s public information includes students from Classes 8 to 12 and students preparing for competitive entrance exams.' },
  ];

  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" aria-label="ICAD home" data-testid="link-home">
            <span className="brand-mark">i</span><span className="brand-text"><strong>ICAD</strong><small>Institute of Career Aspirants</small></span>
          </a>
          <nav className={`nav-links${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
            <a href="#programs" onClick={closeMenu} data-testid="link-programs">Programs</a>
            <a href="#approach" onClick={closeMenu} data-testid="link-approach">Our approach</a>
            <a href="#centers" onClick={closeMenu} data-testid="link-centers">Centers</a>
            <a href="#faq" onClick={closeMenu} data-testid="link-faq">FAQs</a>
          </nav>
          <div className="header-actions">
            <a className="phone-link" href="tel:+917074347074" data-testid="link-call-admissions"><Phone size={15} /><span>+91 70743 47074</span></a>
            <a className="btn btn-primary" href="#enquiry" data-testid="button-talk-to-us">Talk to admissions <ArrowRight size={15} /></a>
            <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-toggle-navigation">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="kicker-dot" /> A clearer way forward</div>
            <h1>Big goals.<br />A <em>steadier</em><br />way there.</h1>
            <p className="hero-intro">The right preparation is more than a classroom. It is a plan your child can follow—and a team your family can trust.</p>
            <div className="hero-ctas">
              <a className="btn btn-primary" href="#programs" data-testid="button-explore-programs">Find their program <ArrowRight size={16} /></a>
              <a className="btn btn-quiet" href="#approach" data-testid="button-see-approach">See how we guide them</a>
            </div>
            <div className="hero-note"><span /> Classroom-led preparation across Maharashtra</div>
          </div>
          <div className="hero-visual" aria-label="A student focused on a classroom problem">
            <div className="hero-ring" />
            <div className="hero-photo"><img src="/student-study.jpg" alt="Student working through a problem in a bright classroom" /><div className="photo-wash" /><div className="photo-caption">Learning, with purpose</div></div>
            <div className="path-card"><div className="path-label">One next step</div><strong>Start with a conversation.</strong><a href="#enquiry" data-testid="link-start-conversation">Talk to an advisor <ArrowRight size={14} /></a></div>
          </div>
        </div>
        <div className="container hero-foot">For students finding their way—and families beside them</div>
      </section>

      <section className="route-band" aria-label="ICAD preparation pathways">
        <div className="container route-inner">
          <div className="route-intro">A focused classroom path for the next big step.</div>
          <div className="route-items">
            <div className="route-item"><b>01</b><span>Engineering<br />JEE · MHT-CET</span></div>
            <div className="route-item"><b>02</b><span>Medicine<br />NEET</span></div>
            <div className="route-item"><b>03</b><span>Strong foundations<br />Classes 8–10</span></div>
          </div>
        </div>
      </section>

      <section className="section program-section" id="programs">
        <div className="container">
          <div className="program-top">
            <div className="section-heading"><div className="eyebrow">Choose a direction</div><h2 className="section-title">The right course<br />starts with <em>the right fit.</em></h2><p className="section-copy">Different ambitions need different preparation. Explore the paths ICAD builds around each one.</p></div>
            <a className="btn btn-quiet" href="#enquiry" data-testid="button-discuss-program">Discuss the options <ArrowRight size={15} /></a>
          </div>
          <div className="program-grid">
            {programs.map(({ id, title, sub, description, icon: Icon }) => (
              <a className="program-card" href="#enquiry" key={id} data-testid={`card-program-${title.toLowerCase().replace(/[^a-z]/g, '')}`}>
                <div className="program-index">PATH {id}</div><div className="program-symbol"><Icon size={23} strokeWidth={1.7} /></div>
                <h3>{title}</h3><p>{sub} · {description}</p><div className="program-link">Explore this path <ArrowRight size={15} /></div>
              </a>
            ))}
          </div>
          <div className="program-footer"><span>Not sure yet? That is a good place to start.</span><a href="#enquiry" data-testid="link-help-choose">Let’s find the fit <ArrowRight size={13} /></a></div>
        </div>
      </section>

      <section className="section method-section" id="approach">
        <div className="container method-layout">
          <div className="method-intro"><div className="eyebrow">A path, not just a timetable</div><h2 className="section-title">Progress is built<br />one clear step<br />at a time.</h2><p className="section-copy">Preparation can feel like a lot. A thoughtful routine makes the work more manageable—for students and the people supporting them.</p><a className="btn btn-primary" href="#enquiry" data-testid="button-plan-next-step">Plan the next step <ArrowRight size={15} /></a></div>
          <div className="steps-list">
            <article className="step-row"><div className="step-num">01</div><div><h3>Find the starting point</h3><p>Talk through the student’s class, goals and current learning needs with the admissions team.</p></div><Compass size={21} /></article>
            <article className="step-row"><div className="step-num">02</div><div><h3>Build the fundamentals</h3><p>Classroom teaching gives concepts the time and attention they need before the pace picks up.</p></div><BookOpen size={21} /></article>
            <article className="step-row"><div className="step-num">03</div><div><h3>Practice with purpose</h3><p>Regular practice and revision help students turn understanding into confident exam preparation.</p></div><GraduationCap size={21} /></article>
            <article className="step-row"><div className="step-num">04</div><div><h3>Keep family in the picture</h3><p>Ask the center about batch schedules, progress conversations and the right support for your child.</p></div><HeartHandshake size={21} /></article>
          </div>
        </div>
      </section>

      <section className="scholarship-section">
        <div className="container scholarship-card">
          <div className="scholarship-copy"><div className="eyebrow">CPA · ICAD scholarship test</div><h2>Make merit part<br />of the conversation.</h2><p>Ask about CPA, ICAD’s scholarship test. Eligible students may receive fee waivers of up to 90%; current terms and registration details are available from admissions.</p><a className="btn btn-primary" href="#enquiry" data-testid="button-ask-about-cpa">Ask about CPA <ArrowRight size={15} /></a></div>
          <div className="scholarship-visual"><div className="waiver-mark"><strong>up to<br />90%</strong><span>fee waiver</span></div><div className="waiver-foot">Eligibility and terms apply · ask admissions</div></div>
        </div>
      </section>

      <section className="section places-section" id="centers">
        <div className="container places-layout">
          <div className="places-art" aria-label="ICAD center locations across Maharashtra"><div className="map-orbit orbit-one" /><div className="map-orbit orbit-two" /><div className="map-orbit orbit-three" /><span className="map-node node-nagpur">Nagpur</span><span className="map-node node-amravati">Amravati</span><span className="map-node node-nashik">Nashik</span><span className="map-node node-yavatmal">Yavatmal</span><span className="map-node node-chandrapur">Chandrapur</span><span className="map-node node-nanded">Nanded</span><div className="map-center"><MapPin size={25} /></div></div>
          <div className="places-copy"><div className="eyebrow">Close to home</div><h2 className="section-title">A classroom<br />within reach.</h2><p className="section-copy">ICAD’s classroom centers span Maharashtra, including its Nagpur head office. Find a location and ask about the programs and batches available there.</p><div className="places-list">{['Nagpur', 'Amravati', 'Chandrapur', 'Yavatmal', 'Nashik', 'Nanded', 'Chhatrapati Sambhaji Nagar'].map((place) => <span key={place}>{place}</span>)}</div><a className="btn btn-quiet" href="#enquiry" data-testid="link-center-enquiry">Ask about a center <ArrowRight size={15} /></a></div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="container faq-layout">
          <aside className="faq-aside"><div className="eyebrow">For the whole family</div><h2 className="section-title">Good questions<br />deserve clear<br />answers.</h2><p>Planning the next academic step takes conversation. Start with the details families ask most.</p><a className="btn btn-quiet" href="#enquiry" data-testid="button-more-questions">Ask us directly <ArrowRight size={15} /></a></aside>
          <div className="faq-list">{faq.map((item, index) => <details className="faq-item" key={item.q} open={index === 0}><summary data-testid={`faq-question-${index + 1}`}><span>{item.q}</span><ChevronDown size={18} /></summary><div className="faq-answer">{item.a}</div></details>)}</div>
        </div>
      </section>

      <section className="enquiry-section" id="enquiry">
        <div className="container enquiry-panel">
            <div className="enquiry-copy"><div className="eyebrow">Start with a conversation</div><h2 className="section-title">Let’s map the<br />next step.</h2><p>Tell us a little about the student and the goal. The ICAD admissions team can help you explore programs, centers, batches and fees.</p><div className="enquiry-note"><ShieldCheck size={18} /><span>An email draft will be prepared for admissions. It is sent only after you review and send it.</span></div></div>
          <form className="lead-form" onSubmit={submitEnquiry}>
            <div className="field"><label htmlFor="student-name">Student / parent name</label><input id="student-name" name="name" required placeholder="Your name" data-testid="input-name" /></div>
            <div className="field"><label htmlFor="phone-number">Phone number</label><input id="phone-number" name="phone" type="tel" required minLength={10} placeholder="10-digit mobile number" data-testid="input-phone" /></div>
            <div className="field"><label htmlFor="student-class">Student’s class</label><select id="student-class" name="class" required defaultValue="" data-testid="select-class"><option value="" disabled>Select a class</option><option>Class 8</option><option>Class 9</option><option>Class 10</option><option>Class 11</option><option>Class 12</option><option>Repeater / drop year</option></select></div>
            <div className="field"><label htmlFor="program-interest">Program of interest</label><select id="program-interest" name="program" required defaultValue="" data-testid="select-program"><option value="" disabled>Choose a path</option><option>JEE (Main & Advanced)</option><option>JEE Main & MHT-CET</option><option>NEET</option><option>Foundation</option><option>Rank Booster</option><option>Not sure yet</option></select></div>
            <div className="field full"><label htmlFor="preferred-center">Preferred center</label><select id="preferred-center" name="center" required defaultValue="" data-testid="select-center"><option value="" disabled>Select a location</option><option>Nagpur</option><option>Amravati</option><option>Chandrapur</option><option>Yavatmal</option><option>Nashik</option><option>Nanded</option><option>Chhatrapati Sambhaji Nagar</option><option>Need help choosing</option></select></div>
            <button className="btn btn-primary" type="submit" data-testid="button-submit-enquiry">Request a conversation <ArrowRight size={15} /></button>
            {submitted && <p className="form-message" role="status" data-testid="status-enquiry"><Check size={15} /> Your email app should open with the enquiry. If it doesn’t, email <a href="mailto:contact@icadiit.com">contact@icadiit.com</a> or call <a href="tel:+917074347074">+91 70743 47074</a>.</p>}
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand"><a className="brand" href="#home" data-testid="link-footer-home"><span className="brand-mark">i</span><span className="brand-text"><strong>ICAD</strong><small>Institute of Career Aspirants</small></span></a><p>Classroom-led preparation for students with big plans—and families helping them get there.</p></div>
            <div className="footer-col"><h4>Explore</h4><div className="footer-links"><a href="#programs">JEE</a><a href="#programs">NEET</a><a href="#programs">MHT-CET</a><a href="#programs">Foundation</a><a href="#approach">Our approach</a><a href="#faq">FAQs</a></div></div>
            <div className="footer-col"><h4>Connect with ICAD</h4><div className="footer-contact"><a href="tel:+917074347074" data-testid="link-footer-phone"><Phone size={15} /> +91 70743 47074</a><a href="mailto:contact@icadiit.com"><Mail size={15} /> contact@icadiit.com</a><a href="#centers"><MapPin size={15} /> Centers across Maharashtra</a></div></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} ICAD · Institute of Career Aspirants</span><a href="#home" data-testid="link-back-to-top">Back to top ↑</a></div>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
