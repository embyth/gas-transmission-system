import IntroView from '../view/intro.js';
import IncomeView from '../view/income.js';
import ResultsView from '../view/results.js';
import ModalView from '../view/modal.js';
import {calculate} from '../utils/calculate.js';
import {blockBodyScroll, unblockBodyScroll, isEscKey} from '../utils/common.js';
import {render, remove} from '../utils/render.js';
import {RenderPosition, SECTION, ModalAction} from '../const.js';

export default class Page {
  constructor(container, incomeDataModel, resultsModel) {
    this._contentContainer = container;
    this._incomeDataModel = incomeDataModel;
    this._resultsModel = resultsModel;

    this._isMenuOpen = false;
    this._isModalOpen = ModalAction.CLOSE;
    this._currentSection = SECTION.INTRO;

    this._introComponent = new IntroView();
    this._incomeComponent = new IncomeView(this._incomeDataModel);
    this._modalComponent = new ModalView(this._incomeDataModel);
    this._resultsComponent = new ResultsView(this._resultsModel);

    this._hamburgerNode = document.querySelector(`.hamburger`);
    this._menuNode = document.querySelector(`.site-aside`);
    this._overlayNode = document.querySelector(`.site-aside__overlay`);

    this._navigationButtons = document.querySelectorAll(`.site-nav__button`);

    this._handleSiteMenuOpen = this._handleSiteMenuOpen.bind(this);
    this._handleSiteMenuClose = this._handleSiteMenuClose.bind(this);
    this._hamburgerKeyDownHandler = this._hamburgerKeyDownHandler.bind(this);
    this._hamburgerClickHandler = this._hamburgerClickHandler.bind(this);
    this._navButtonsClickHandler = this._navButtonsClickHandler.bind(this);
    this._handleBeginButtonClick = this._handleBeginButtonClick.bind(this);
    this._handleApplyButtonClick = this._handleApplyButtonClick.bind(this);
    this._handleCalcButtonClick = this._handleCalcButtonClick.bind(this);
    this._handleSelectChange = this._handleSelectChange.bind(this);
    this._handleModalClose = this._handleModalClose.bind(this);
    this._handleModalOpen = this._handleModalOpen.bind(this);
    this._modalKeyDownHandler = this._modalKeyDownHandler.bind(this);
  }

  init() {
    render(this._contentContainer, this._introComponent, RenderPosition.BEFOREEND);
    this._introComponent.setBeginButtonClickHandler(this._handleBeginButtonClick);
    this._setPageHandlers();
  }

  _pageSectionHandler(type) {
    this._clearPage();
    this._handleNavButtonsActiveState(type);

    switch (type) {
      case SECTION.INTRO:
        render(this._contentContainer, this._introComponent, RenderPosition.BEFOREEND);
        this._introComponent.setBeginButtonClickHandler(this._handleBeginButtonClick);
        break;
      case SECTION.DATA:
        render(this._contentContainer, this._incomeComponent, RenderPosition.BEFOREEND);
        this._incomeComponent.setCalcButtonClickHandler(this._handleCalcButtonClick);
        this._incomeComponent.setGpuSelectChangeHandler(this._handleSelectChange);
        this._incomeComponent.setSuperchargerSelectChangeHandler(this._handleSelectChange);
        this._incomeComponent.setModalOpenerClickHandler(this._handleModalOpen);
        break;
      case SECTION.RESULTS:
        render(this._contentContainer, this._resultsComponent, RenderPosition.BEFOREEND);
        break;
    }

    this._currentSection = type;
  }

  _modalViewHandler(isModalOpen) {
    if (this._isModalOpen === isModalOpen) {
      return;
    }

    switch (isModalOpen) {
      case ModalAction.OPEN:
        blockBodyScroll();
        render(document.body, this._modalComponent, RenderPosition.BEFOREEND);
        this._modalComponent.animateAppearance();
        this._modalComponent.setCloseButtonClickHandler(this._handleModalClose);
        this._modalComponent.setApplyButtonClickHandler(this._handleApplyButtonClick);
        document.addEventListener(`keydown`, this._modalKeyDownHandler);
        break;
      case ModalAction.CLOSE:
        unblockBodyScroll();
        remove(this._modalComponent);
        document.removeEventListener(`keydown`, this._modalKeyDownHandler);
        break;
    }

    this._isModalOpen = isModalOpen;
  }

  _clearPage() {
    switch (this._currentSection) {
      case SECTION.INTRO:
        remove(this._introComponent);
        break;
      case SECTION.DATA:
        remove(this._incomeComponent);
        break;
      case SECTION.RESULTS:
        remove(this._resultsComponent);
        break;
    }
  }

  _setPageHandlers() {
    this._hamburgerNode.addEventListener(`click`, this._hamburgerClickHandler);
    this._overlayNode.addEventListener(`click`, this._hamburgerClickHandler);
    this._navigationButtons.forEach((button) => button.addEventListener(`click`, this._navButtonsClickHandler));
  }

  _handleBeginButtonClick() {
    this._pageSectionHandler(SECTION.DATA);
  }

  _handleApplyButtonClick() {
    this._handleModalClose();
  }

  _handleCalcButtonClick() {
    if (this._incomeComponent.isCustomGPU() && !this._modalComponent.isUserDataValid()) {
      this._handleModalOpen();
    } else {
      calculate(this._incomeDataModel.getData(), this._resultsModel);
      [...this._navigationButtons].find((button) => button.dataset.section === SECTION.RESULTS).disabled = false;
      this._pageSectionHandler(SECTION.RESULTS);
    }
  }

  _handleSelectChange(isCustom) {
    if (isCustom) {
      this._incomeComponent.showModalOpener();
      this._modalViewHandler(ModalAction.OPEN);
    } else {
      this._incomeComponent.hideModalOpener();
    }
  }

  _handleModalClose() {
    this._modalViewHandler(ModalAction.CLOSE);
  }

  _handleModalOpen() {
    this._modalViewHandler(ModalAction.OPEN);
  }

  _modalKeyDownHandler(evt) {
    if (isEscKey(evt)) {
      this._handleModalClose();
    }
  }

  _navButtonsClickHandler(evt) {
    evt.preventDefault();
    const type = evt.target.dataset.section;

    if (this._currentSection === type) {
      return;
    }

    this._pageSectionHandler(type);
  }

  _handleNavButtonsActiveState(type) {
    this._navigationButtons.forEach((button) => button.classList.remove(`site-nav__button--current`));

    [...this._navigationButtons].find((button) => button.dataset.section === type).classList.add(`site-nav__button--current`);
  }

  _handleSiteMenuOpen() {
    blockBodyScroll();

    this._hamburgerNode.classList.add(`is-active`);
    this._menuNode.classList.remove(`site-aside--hidden`);
    this._overlayNode.classList.remove(`site-aside__overlay--hidden`);

    document.addEventListener(`keydown`, this._hamburgerKeyDownHandler);
  }

  _handleSiteMenuClose() {
    unblockBodyScroll();

    this._hamburgerNode.classList.remove(`is-active`);
    this._menuNode.classList.add(`site-aside--hidden`);
    this._overlayNode.classList.add(`site-aside__overlay--hidden`);

    document.removeEventListener(`keydown`, this._hamburgerKeyDownHandler);
  }

  _hamburgerKeyDownHandler(evt) {
    if (isEscKey(evt)) {
      this._isMenuOpen = false;
      this._handleSiteMenuClose();
    }
  }

  _hamburgerClickHandler(evt) {
    evt.preventDefault();

    if (this._isMenuOpen) {
      this._isMenuOpen = false;
      this._handleSiteMenuClose();
    } else {
      this._isMenuOpen = true;
      this._handleSiteMenuOpen();
    }
  }
}
