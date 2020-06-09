import {useState, useEffect, useRef} from 'react'

export default function useJsonFetch(url, opts) {
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(null);
    const timestampRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const timestamp = Date.now();
            timestampRef.current = timestamp;
            setLoading(true);

            const response = await fetch(url + opts);
            
            try{
                if(!response.ok) {
                    throw response.status;
                }
                const note = await response.json();
                if(note) {
                    setData(note.status)
                }
            } catch(e) {
                if(e > 300) {
                    setError('ОШИБКА ОТВЕТА')
                } else {
                    setError('ОШИБКА СЕТИ')
                }
                
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [])
    return [{data, isLoading, hasError}]
}