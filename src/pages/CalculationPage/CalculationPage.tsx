import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCalculation, deleteCalculation } from '@/api/cavi';
import { ensureAuth } from '@/api/auth';
import type { CaviCalculation, CaviCalculationGroup } from '@/types/cavi';
import { calculationMock } from '@/mocks/groups';
import {
  DEFAULT_DIASTOLIC,
  DEFAULT_PWV,
  DEFAULT_SYSTOLIC,
  calculateCAVI,
} from '@/utils/cavi';
import { MeasurementForm } from '@/components/MeasurementForm';
import { ServicesList } from '@/components/ServicesList';
import { DeleteCalculationButton } from '@/components/DeleteCalculationButton';
import '@/styles/calculation.css';

export const CalculationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [calculation, setCalculation] = useState<CaviCalculation | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadCalculation = async () => {
      if (!id) return;
      setLoading(true);
      try {
        await ensureAuth();
        const response = await fetchCalculation(Number(id));
        setCalculation(response);
      } catch (err) {
        console.error(err);
        setCalculation(calculationMock);
      } finally {
        setLoading(false);
      }
    };
    loadCalculation();
  }, [id]);

  const handleDeleteCalculation = async () => {
    if (!id) return;
    
    setDeleting(true);
    try {
      await ensureAuth();
      await deleteCalculation(Number(id));
      navigate('/');
    } catch (err) {
      console.error('Не удалось удалить заявку', err);
    } finally {
      setDeleting(false);
    }
  };

  const systolic = calculation?.systolicPressure ?? DEFAULT_SYSTOLIC;
  const diastolic = calculation?.diastolicPressure ?? DEFAULT_DIASTOLIC;
  const pwv = calculation?.pulseWaveVelocity ?? DEFAULT_PWV;

  const groups = useMemo<CaviCalculationGroup[]>(() => {
    if (!calculation?.calculationGroups) {
      return [];
    }
    return calculation.calculationGroups.map((item) => ({
      ...item,
      calculatedCAVI: item.group ? calculateCAVI(item.group, systolic, diastolic, pwv) : 0,
    }));
  }, [calculation, systolic, diastolic, pwv]);

  return (
    <>
      {loading && <p>Загрузка...</p>}
      {!loading && calculation && (
        <>
          <h1>Расчёт CAVI</h1>
          <div className="form-container">
            <MeasurementForm systolic={systolic} diastolic={diastolic} pwv={pwv} />

            <div className="form-section">
              <h2>Выбранные услуги</h2>
              <ServicesList groups={groups} />
              {!!groups.length && (
                <DeleteCalculationButton
                  onDelete={handleDeleteCalculation}
                  isDeleting={deleting}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

