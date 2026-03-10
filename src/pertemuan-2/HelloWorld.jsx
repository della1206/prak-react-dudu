export default function HelloWorld(){
    const propsUserCard = {
        nama: "Goku",
        nim: "999999",
        tanggal: "2025-01-01"
    }
    return (
        <div>
            <h1>Hello World</h1>
            <p>Selamat Belajar ReactJs</p>
            <GreetingBinjai />
                 <UserCard
                nama="Della"
                nim="24573010032"
                tanggal="2026/03/10"/>
            
            <UserCard
                nama="Angel"
                nim="24573010033"
                tanggal="2026/03/10"/>

            <UserCard {...propsUserCard} />
        </div>
    )
}

function GreetingBinjai(){
    return(
        <small className="card">Salam dari BInjai🙌 </small>
    )
}


function UserCard(props){
    return (
        <div className="card">
            <hr/>
            <h3>Nama: {props.nama}</h3>
            <p>NIM: {props.nim}</p>
            <p>Tanggal: {props.tanggal}</p>
        </div>
    )
}