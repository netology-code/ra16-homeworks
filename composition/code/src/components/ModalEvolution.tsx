import React from 'react';

// 1. Первая версия - жестко заданный контент
export function TodayOfferModal() {
  return (
    <div className="modal">
      <div className="modal-body">
        <h2>Только сегодня и только сейчас!</h2>
        <a href="/today/">Узнать подробнее</a>
      </div>
      <button className="btn btn-close">Закрыть</button>
    </div>
  );
}

// Дублирование для другой акции
export function DiscountOfferModal() {
  return (
    <div className="modal">
      <div className="modal-body">
        <h2>Самые большие скидки!</h2>
        <a href="/discount/">Узнать подробнее</a>
      </div>
      <button className="btn btn-close">Закрыть</button>
    </div>
  );
}

// 2. Props для данных
interface OfferModalProps {
  title: string;
  link: string;
}

export function OfferModal({ title, link }: OfferModalProps) {
  return (
    <div className="modal">
      <div className="modal-body">
        <h2>{title}</h2>
        <a href={link}>Узнать подробнее</a>
      </div>
      <button className="btn btn-close">Закрыть</button>
    </div>
  );
}

// 3. Компонент как prop
interface OfferModalWithBodyProps {
  body: React.ReactNode;
}

export function OfferModalWithBody({ body }: OfferModalWithBodyProps) {
  return (
    <div className="modal">
      <div className="modal-body">
        {body}
      </div>
      <button className="btn btn-close">Закрыть</button>
    </div>
  );
}

// 4. Решение через children (рекомендуется)
interface ModalProps {
  children: React.ReactNode;
}

export function Modal({ children }: ModalProps) {
  return (
    <div className="modal">
      <div className="modal-body">
        {children}
      </div>
      <button className="btn btn-close">Закрыть</button>
    </div>
  );
}

// Компонент для демонстрации
export function SubscriptionForm() {
  return (
    <form className="subscription-form">
      <h3>Выберите тариф</h3>
      <label>
        <input type="radio" name="plan" value="basic" />
        Базовый план - 500₽/мес
      </label>
      <label>
        <input type="radio" name="plan" value="premium" />
        Премиум план - 1000₽/мес
      </label>
      <button type="submit">Подписаться</button>
    </form>
  );
}

// Демонстрация всех подходов
export function ModalEvolutionDemo() {
  return (
    <div className="demo-section">
      <h2>Эволюция компонента Modal</h2>
      
      <div className="example">
        <h3>1. Жестко заданный контент</h3>
        <TodayOfferModal />
        <DiscountOfferModal />
      </div>

      <div className="example">
        <h3>2. Props для данных</h3>
        <OfferModal title="Распродажа книг" link="/books/" />
      </div>

      <div className="example">
        <h3>3. Компонент как prop</h3>
        <OfferModalWithBody body={<SubscriptionForm />} />
      </div>

      <div className="example">
        <h3>4. Решение через children ✅</h3>
        <Modal>
          <h2>Выбери свой абонемент!</h2>
          <SubscriptionForm />
        </Modal>
      </div>
    </div>
  );
}