import { Link } from 'react-router-dom';
import '@/styles/home-page.css';

export const HomePage = () => (
  <div className="home-page">
    <section className="hero-section">
      <h1>CAVI Калькулятор</h1>
      <p className="hero-text">
        Система расчёта индекса CAVI (Cardio-Ankle Vascular Index) — современный инструмент для
        оценки жёсткости артерий и риска сердечно-сосудистых заболеваний.
      </p>
      <Link to="/groups" className="hero-button">
        Перейти к группам пациентов
      </Link>
    </section>

    <section className="info-section">
      <h2>Что такое CAVI?</h2>
      <div className="info-cards">
        <div className="info-card">
          <h3>Диагностика</h3>
          <p>
            CAVI позволяет оценить эластичность артерий независимо от артериального давления в
            момент измерения.
          </p>
        </div>
        <div className="info-card">
          <h3>Профилактика</h3>
          <p>
            Раннее выявление изменений сосудистой стенки помогает предотвратить развитие серьёзных
            заболеваний.
          </p>
        </div>
        <div className="info-card">
          <h3>Мониторинг</h3>
          <p>
            Регулярные измерения позволяют отслеживать эффективность лечения и изменения состояния
            сосудов.
          </p>
        </div>
      </div>
    </section>

    <section className="features-section">
      <h2>Возможности системы</h2>
      <ul className="features-list">
        <li>Классификация пациентов по возрастным группам</li>
        <li>Учёт сопутствующих заболеваний (диабет, гипертония)</li>
        <li>Расчёт индекса CAVI на основе измерений давления</li>
        <li>Формирование заявок на расчёт</li>
      </ul>
    </section>
  </div>
);
