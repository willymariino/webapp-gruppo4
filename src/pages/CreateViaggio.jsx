import accompagnatori from "../data/accompagnatori";
import { useState } from "react";
import viaggi from "../data/viaggi";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'

const CreateViaggio = () => {

    let navigate = useNavigate();

    const [newViaggio, setNewViaggio] = useState({
        id: '',
        localita: '',
        data_inizio: '',
        data_fine: '',
        accompagnatori: [],
        itinerario: '',
        posti_max: 15,
        image: ''
    });

    const optionsSelect = accompagnatori.map((acc) => {
        return { value: acc.id, label: `${acc.nome} ${acc.cognome}` }
    });



    console.log(optionsSelect);

    const selectedOptions = [];
    const accompagnatoriSelected = accompagnatori.filter(acc => selectedOptions.includes(acc.id.toString()));

    const handleChange = (e) => {
        e.preventDefault();
        let { name, value } = e.target
        console.log(e.target)
        setNewViaggio((newViaggio) => ({
            ...newViaggio,
            id: viaggi.length + 1,
            [name]: value
        }))
    };


    const handleSelectChange = (selectedOptions) => {
        if (selectedOptions.length <= 2) {
            setNewViaggio({
                ...newViaggio,
                accompagnatori: selectedOptions,
            });
        }
    }

    function submitHandler(e) {
        e.preventDefault();
        if (newViaggio.localita === "" || newViaggio.data_inizio === "" || newViaggio.data_fine === "") {
            alert("Inserire almeno la località e la data di inizio e di fine");
            return
        } else if (newViaggio.data_inizio > newViaggio.data_fine) {
            alert("La data di inizio non può essere superiore alla data di fine");
            return
        }
        alert('Nuovo viaggio salvato!');
        console.log(newViaggio);
        viaggi.push(newViaggio);
        console.log(viaggi);
        setNewViaggio({
            id: '',
            localita: '',
            data_inizio: '',
            data_fine: '',
            accompagnatori: [],
            itinerario: '',
            posti_max: 15,
            image: ''
        })
    }

    return <>
        <section className="details-container">
            <form className="form-container" action="" onSubmit={submitHandler}>
                <div>
                    <label className="mr-5" htmlFor="localita">Località:</label>
                    <input type="text" name="localita" id="localita" value={newViaggio.localita} onChange={handleChange} required />
                </div>
                <div>
                    <label className="mr-5" htmlFor="data_inizio">Data di inizio:</label>
                    <input type="date" name="data_inizio" id="data_inizio" value={newViaggio.data_inizio} onChange={handleChange} required />
                </div>
                <div>
                    <label className="mr-5" htmlFor="data_fine">Data di fine:</label>
                    <input type="date" name="data_fine" id="data_fine" value={newViaggio.data_fine} onChange={handleChange} required />
                </div>
                <div>
                    {/* <select name="accompagnatori" id="accompagnatori" multiple value={selectedOptions} onChange={handleChange} >
                        {accompagnatori.map((acc) => (<option key={acc.id} value={acc.id}>{acc.nome}</option>))}
                    </select> */}
                    <Select
                        options={optionsSelect}
                        isMulti
                        name="accompagnatori"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        closeMenuOnSelect={false}
                        onChange={handleSelectChange}
                        value={newViaggio.accompagnatori}
                    />
                    <ul>
                        {accompagnatoriSelected.map(acc => (<li key={acc.id}>{acc.nome} {acc.cognome}</li>))}
                    </ul>
                </div>
                <div>
                    <label className="mr-5" htmlFor="itinerario">Itinerario:</label>
                    <input type="text" name="itinerario" id="itinerario" value={newViaggio.itinerario} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="image">image:</label>
                    <input type="file" name="image" id="image" value={newViaggio.image} onChange={handleChange} required />
                </div>
                <button className="btn-details" type="submit">Aggiungi</button>
            </form>
            <button className="btn-details" onClick={() => navigate(-1)}>Torna alla Home</button>
        </section>

    </>
}

export default CreateViaggio;