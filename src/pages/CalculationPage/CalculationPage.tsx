import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCalculation, deleteCalculation } from '@/api/cavi';
import { ensureAuth } from '@/api/auth';
import type { CaviCalculation, CaviCalculationGroup } from '@/types/cavi';
import { calculationMock } from '@/mocks/groups';
import defaultImage from '@/assets/images/default.jpg';
import {
  DEFAULT_DIASTOLIC,
  DEFAULT_PWV,
  DEFAULT_SYSTOLIC,
  calculateCAVI,
} from '@/utils/cavi';
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
            <div className="form-section">
              <h2>Данные измерений</h2>
              <div className="measurement-form">
                <div className="form-group">
                  <label>Скорость распространения пульсовой волны (м/с)</label>
                  <input type="number" value={pwv} readOnly />
                </div>
                <div className="form-group">
                  <label>Систолическое артериальное давление (мм рт. ст.)</label>
                  <input type="number" value={systolic} readOnly />
                </div>
                <div className="form-group">
                  <label>Диастолическое артериальное давление (мм рт. ст.)</label>
                  <input type="number" value={diastolic} readOnly />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Выбранные услуги</h2>
              {!groups.length && <p className="empty-cart-message">Тут пусто</p>}
              {!!groups.length && (
                <>
                  <div className="services-list">
                    {groups.map((item) => (
                      <div className="service-item" key={item.id}>
                        <div className="service-info">
                          <img
                            src={item.group?.imageURL || defaultImage}
                            alt={item.group?.name}
                            className="service-image"
                            onError={(event) => {
                              (event.target as HTMLImageElement).src = defaultImage;
                            }}
                          />
                          <div className="service-details">
                            <h3>{item.group?.name}</h3>
                            <p className="service-subtitle">{item.group?.description}</p>
                          </div>
                        </div>
                        <div className="control-group CAVI-price-group">
                          <div className="CAVI-price-group-content">
                            <span className="price-value">{item.calculatedCAVI?.toFixed(3)}</span>
                            <span className="price-label">Рассчитанный CAVI</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="delete-calculation-section">
                    <button
                      type="button"
                      className="btn-delete-calculation"
                      onClick={handleDeleteCalculation}
                      disabled={deleting}
                    >
                      {deleting ? 'Удаление...' : 'Удалить заявку'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

