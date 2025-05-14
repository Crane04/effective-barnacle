// ProfileWizard.tsx
import React, { useState } from "react";
import Stepper from "../components/Stepper";
import HouseholdForm from "../components/forms/HouseholdForm";
import LivingSituationForm from "../components/forms/Employment";
import Demographics from "../components/forms/Demographics";
import FinancialBehaviorForm from "../components/forms/FinancialBehaviorForm";
import FinancialHealthForm from "../components/forms/FinancialHealthForm";
import MobileMoneyForm from "../components/forms/DigitalFinanceForm";

const ProfileWizard: React.FC = () => {
  const [step, setStep] = useState(0);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Demographics />;
      case 1:
        return <HouseholdForm />;
      case 2:
        return <FinancialBehaviorForm />;
        
      case 3:
        return <LivingSituationForm />;

      case 4:
        return <FinancialHealthForm />;
      case 5:
        return <MobileMoneyForm />;
      default:
        return null;
    }
  };

  return (
    <div className="profile-wizard">
      <h1>Update Profile</h1>
      <Stepper currentStep={step} onStepClick={setStep} />
      <div>{renderStep()}</div>
    </div>
  );
};

export default ProfileWizard;
