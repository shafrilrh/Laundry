import React from "react"
import Navbar from "./Navbar"
import axios from "axios"
import { base_url } from "../config"
import $ from "jquery"

export default class Member extends React.Component{
    constructor(){
        super()
        this.state = {
            member: [],
            token: "",
            action: "",
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: ""
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)

    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getMember = () => {
        let url = base_url + "/member"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({member: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    componentDidMount(){
        this.getMember()
    }

    Add = () => {
        $("#modal_member").modal("show")
        this.setState({
            action: "insert",
            id_member: 0,
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: ""
        })
    }

    saveMember = event => {
        event.preventDefault()
        let form = {
            id_member: this.state.id_member,
            nama: this.state.nama,
            alamat: this.state.alamat,
            jenis_kelamin: this.state.jenis_kelamin,
            tlp: this.state.tlp
        }
      

        let url = base_url + "/member"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMember()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMember()
            })
            .catch(error => console.log(error))
        }
        $("#modal_member").modal("hide")
    }


    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <br></br>
                    <h3 className="text-bold text-dark mt-2 text-center">Daftar Data Member</h3>
                    <br></br>
                    <div className="row">
                    <table className="table table-bordered table-hover text-center">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID Member</th>
                                <th>Nama</th>
                                <th>Alamat</th>
                                <th>Jenis Kelamin</th>
                                <th>No Telfon</th>
                            </tr>
                        </thead>
                        { this.state.member.map( item => (
                            <tbody>
                                <tr>
                                    <td>{item.id_member}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.alamat}</td>
                                    <td>{item.jenis_kelamin}</td>
                                    <td>{item.tlp}</td>
                                </tr>
                            </tbody>
                        )) }
                    </table>
                    </div>
                    <br></br>
                    <button className="btn btn-dark" onClick={() => this.Add()}>
                        Member Baru
                   </button>
                   <br></br>
                   <br></br>
                </div>

                {/* modal member */}
                <div className="modal fade" id="modal_member">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header">
                                 <h4>Form Member</h4>
                                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                             </div>
                             <form onSubmit={ev => this.saveMember(ev)}>
                             <div className="modal-body">
                                 
                                     Nama Member
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nama}
                                     onChange={ev => this.setState({nama: ev.target.value})}
                                     required
                                     />
                                     Alamat
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.alamat}
                                     onChange={ev => this.setState({alamat: ev.target.value})}
                                     required
                                     />
                                     Jenis Kelamin
                                    <select class="form-control mb-1" value={this.state.jenis_kelamin} 
                                    onChange={ev => this.setState({jenis_kelamin: ev.target.value})} required>
                                        <option value="L">
                                            Laki Laki
                                        </option>
                                        <option value="P">
                                            Perempuan
                                        </option>
                                    </select>
                                     Nomer Telfon
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.tlp}
                                     onChange={ev => this.setState({tlp: ev.target.value})}
                                     required
                                     />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-dark">
                                        Simpan
                                    </button>
                                </div>
                             </form>
                         </div>
                     </div>
                 </div>
            </div>
        )
    }
}
