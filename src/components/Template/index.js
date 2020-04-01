import React from 'react';

import { Link } from 'react-router-dom';

import { MdDashboard, MdAssignmentTurnedIn, MdTimer } from 'react-icons/md';

import notes from '../../assets/img/notes.svg';

import '../../assets/css/styles.css';

const Template = ({ children, page, number }) => (
  <>
    <div id="sidedrawer" className="mui--no-user-select">
      <div id="sidedrawer-brand" className="mui--appbar-line-height">
        <MdTimer size={25} className="brand-icon" />
        <span className="mui--text-title">gTask</span>
      </div>
      <a
        href="/"
        className={
          page === 'Tarefas'
            ? 'sidedrawer-item sidedrawer-item-active'
            : 'sidedrawer-item'
        }
      >
        <MdDashboard size={20} />
        <p className="menu-text">Tarefas</p>
      </a>
      <a
        href="/finished"
        className={
          page === 'Tarefas Concluídas'
            ? 'sidedrawer-item sidedrawer-item-active'
            : 'sidedrawer-item'
        }
      >
        <MdAssignmentTurnedIn size={20} />
        <p className="menu-text">Tarefas Concluídas</p>
      </a>
      <div className="menu-bottom">
        <div className="menu-bottom-center">
          <img src={notes} alt="notes" className="menu-bottom-image" />
        </div>
        Organize suas atividades e calcule o tempo de execução. <br />
        <p className="bolder">
          <br />
          Desenvolvido Por: Iago Ronan <br />
          iago.vsantos@gmail.com <br /> (82) 9.9838-2776
        </p>
      </div>
    </div>
    <header id="header">
      <div className="mui-appbar mui--appbar-line-height">
        <div className="mui-container">
          <a className="sidedrawer-toggle mui--visible-xs-inline-block mui--visible-sm-inline-block js-show-sidedrawer">
            ☰
          </a>
          <a className="sidedrawer-toggle mui--hidden-xs mui--hidden-sm js-hide-sidedrawer">
            ☰
          </a>
          <span className="mui--text-title2">
            {page} {number >= 0 && <span>({number})</span>}
          </span>
        </div>
      </div>
    </header>
    {children}
  </>
);

export default Template;
