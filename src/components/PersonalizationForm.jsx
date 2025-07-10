import React, { useState } from 'react';
import {
  User,
  MapPin,
  Clock,
  Heart,
  Briefcase,
  Car,
  Home,
  Coffee,
  Dumbbell,
  ShoppingBag,
  Calendar,
  ChevronRight,
  X,
  Check
} from 'lucide-react';
import '../styles/PersonalizationForm.css';

const PersonalizationForm = ({ isOpen, onClose, theme }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    workSchedule: '',
    interests: [],
    commute: '',
    wakeUpTime: '',
    sleepTime: '',
    weatherSensitivity: 'normal'
  });

  const interests = [
    { id: 'sports', label: 'Sport', icon: Dumbbell },
    { id: 'work', label: 'Travail', icon: Briefcase },
    { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
    { id: 'coffee', label: 'Café', icon: Coffee },
    { id: 'home', label: 'Maison', icon: Home },
    { id: 'travel', label: 'Voyage', icon: Car }
  ];

  const handleInterestToggle = (interestId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  if (!isOpen) return null;

  return (
    <div className="personalization-overlay">
      <div className="personalization-container">
        <div className={`personalization-form ${theme}`}>
          {/* Header */}
          <div className="form-header">
            <div className="form-header-text">
              <h2 className="form-title">Personnalisation</h2>
              <p className="form-subtitle">Étape {step} sur 4</p>
            </div>
            <button
              onClick={onClose}
              className="form-close-button"
            >
              <X className="close-icon" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          <div className="form-content">
            {step === 1 && (
              <div className="form-step">
                <div className="step-header">
                  <User className="step-icon" />
                  <h3 className="step-title">Informations de base</h3>
                  <p className="step-description">Aidez-nous à mieux vous connaître</p>
                </div>

                <div className="form-fields">
                  <div className="form-field">
                    <label className="field-label">Prénom</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="field-input"
                      placeholder="Votre prénom"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Localisation</label>
                    <div className="field-input-with-icon">
                      <MapPin className="field-icon" />
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="field-input with-icon"
                        placeholder="Paris, France"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-step">
                <div className="step-header">
                  <Clock className="step-icon" />
                  <h3 className="step-title">Horaires</h3>
                  <p className="step-description">Vos habitudes quotidiennes</p>
                </div>

                <div className="form-fields">
                  <div className="form-row">
                    <div className="form-field">
                      <label className="field-label">Réveil</label>
                      <input
                        type="time"
                        value={formData.wakeUpTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, wakeUpTime: e.target.value }))}
                        className="field-input"
                      />
                    </div>
                    <div className="form-field">
                      <label className="field-label">Coucher</label>
                      <input
                        type="time"
                        value={formData.sleepTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, sleepTime: e.target.value }))}
                        className="field-input"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Horaires de travail</label>
                    <select
                      value={formData.workSchedule}
                      onChange={(e) => setFormData(prev => ({ ...prev, workSchedule: e.target.value }))}
                      className="field-select"
                    >
                      <option value="">Sélectionner</option>
                      <option value="9-17">9h - 17h</option>
                      <option value="8-16">8h - 16h</option>
                      <option value="10-18">10h - 18h</option>
                      <option value="flexible">Horaires flexibles</option>
                      <option value="night">Travail de nuit</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-step">
                <div className="step-header">
                  <Heart className="step-icon" />
                  <h3 className="step-title">Centres d'intérêt</h3>
                  <p className="step-description">Sélectionnez vos activités favorites</p>
                </div>

                <div className="interests-grid">
                  {interests.map((interest) => {
                    const Icon = interest.icon;
                    const isSelected = formData.interests.includes(interest.id);

                    return (
                      <button
                        key={interest.id}
                        onClick={() => handleInterestToggle(interest.id)}
                        className={`interest-button ${isSelected ? 'selected' : ''}`}
                      >
                        <Icon className="interest-icon" />
                        <span className="interest-label">{interest.label}</span>
                        {isSelected && (
                          <Check className="interest-check" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="form-step">
                <div className="step-header">
                  <Calendar className="step-icon" />
                  <h3 className="step-title">Préférences météo</h3>
                  <p className="step-description">Derniers détails pour personnaliser</p>
                </div>

                <div className="form-fields">
                  <div className="form-field">
                    <label className="field-label">Sensibilité météo</label>
                    <div className="sensitivity-options">
                      {[
                        { value: 'low', label: 'Peu sensible', desc: 'Vous sortez par tous les temps' },
                        { value: 'normal', label: 'Normal', desc: 'Vous adaptez selon la météo' },
                        { value: 'high', label: 'Très sensible', desc: 'Vous préférez rester au chaud/frais' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setFormData(prev => ({ ...prev, weatherSensitivity: option.value }))}
                          className={`sensitivity-option ${formData.weatherSensitivity === option.value ? 'selected' : ''}`}
                        >
                          <div className="sensitivity-label">{option.label}</div>
                          <div className="sensitivity-desc">{option.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Moyen de transport principal</label>
                    <select
                      value={formData.commute}
                      onChange={(e) => setFormData(prev => ({ ...prev, commute: e.target.value }))}
                      className="field-select"
                    >
                      <option value="">Sélectionner</option>
                      <option value="car">Voiture</option>
                      <option value="public">Transport en commun</option>
                      <option value="bike">Vélo</option>
                      <option value="walk">À pied</option>
                      <option value="mixed">Mixte</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="form-navigation">
            <div className="navigation-buttons">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="nav-button secondary"
                >
                  Précédent
                </button>
              )}

              <button
                onClick={step === 4 ? onClose : nextStep}
                className="nav-button primary"
              >
                <span>{step === 4 ? 'Terminer' : 'Suivant'}</span>
                {step < 4 && <ChevronRight className="nav-icon" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationForm;
