import React from 'react';

type IQueryStatus = 'success' | 'error' | 'pending' | 'idle';

export const useQuery = <TData,>(url: string | null) => {
  const [status, setStatus] = React.useState<IQueryStatus>('idle');
  const [data, setData] = React.useState<TData | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  const sendRequest = async () => {
    setStatus('pending');
    setError(null);
    setData(null);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        setStatus('error');
      }

      const parsedResult = await response.json();

      setStatus('success');
      setData(parsedResult);
    } catch (error) {
      setStatus('error');
      setError(error);
    }
  };

  React.useEffect(() => {
    if (url !== null) {
      sendRequest();
    }
  }, [url]);

  return { error, data, status };
};
