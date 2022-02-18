import React from 'react'

function Send() {
    const [name, setName ] = useState('')
    const [email, setemail] = useState('')
    const [college, setcollege] = useState('')
    const [studentId, setStudentId] = useState('')
    const [password, setpassword] = useState('')
    const [dob, setdob] = useState('')
    const [fileName, setfileName] = useState('')

 
        const data = new FormData();
        data.append('UnVjaGFsaSByYWprdW1hciBkZXNobWFuZQ==', name);
        data.append('cnVjaGFsaWRlc2htYW5lMTIzQGdtYWlsLmNvbQ==', email);
        data.append('U1VNQkVBTSBQVU5F', college);
        data.append('UE0wMDQ2', studentId);
        data.append('UnVjaGFsaUA3Mjg0',password);
        data.append('MTkvMDkvMTk5Nw==', dob);
        data.append('', fileName );

        axios.put(url + 'https://prod-14.centralindia.logic.azure.com/workflows/972955afd22848b28deee775973f2de2/triggers/request/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=eAxdOb22-hbUsk7ECS_nhbafv7ZI0K-n4PP_Eh2Kuy0', data).then((response) => {
            const result = response.data
            if(result.status === 'success'){
                window.alert('speciality sent')
            }else{
                window.alert('Failed to update')
            }
        })

    return (
        <div>
            <button onClick={Send}>SEND</button>
        </div>
    )
}

export default Send
