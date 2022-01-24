import React from "react"
import Navbar from "./Navbar"
import axios from "axios"
import { base_url } from "../config.js"
import $ from "jquery"

export default class Transaksi extends React.Component{
    constructor(){
        super()
        this.state = {
            transaksi: [],
            detail: [],
            token: "",
            action: "",
            id_transaksi: "",
            id_member: "",
            tgl: "",
            batas_waktu: "",
            tgl_bayar: "",
            status: "",
            dibayar: "",
            id_user: "",
            id_paket: "",
            qty: ""
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

    getTransaksi = () => {
        let url = base_url + "/transaksi"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({transaksi: response.data})
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

    getDetail = () => {
        let url = base_url + "/detail"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({transaksi: response.data})
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
        this.getTransaksi()
    }

    Add = () => {
        $("#modal_transaksi").modal("show")
        this.setState({
            action: "insert",
            id_transaksi: 0,
            id_member: "",
            tgl: "",
            batas_waktu: "",
            tgl_bayar: "",
            status: "",
            dibayar: "",
            id_user: ""
        })
    }

    Up = () => {
        $("#modal_up").modal("show")
        this.setState({
            action: "insert",
            id_detail: 0,
            id_transaksi: "",
            id_paket: "",
            qty: ""
        })
    }

    Edit = selectedItem => {
        $("#modal_transaksi").modal("show")
        this.setState({
            action: "update",
            id_transaksi: selectedItem.id_transaksi,
            id_member: selectedItem.id_member,
            tgl: selectedItem.tgl,
            batas_waktu: selectedItem.batas_waktu,
            tgl_bayar: selectedItem.tgl_bayar,
            status: selectedItem.status,
            dibayar: selectedItem.dibayar,
            id_user: selectedItem.id_user,
        })
    }

    Detail = selectedItem => {
        $("#modal_detail").modal("show")
        let url = base_url + "/detail/" + selectedItem.id_transaksi
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({detail: response.data.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                }
            }else{
                console.log(error);
            }
        })
    }

    saveTransaksi = event => {
        event.preventDefault()
        let form = {
            id_transaksi: this.state.id_transaksi,
            id_member: this.state.id_member,
            tgl: this.state.tgl,
            batas_waktu: this.state.batas_waktu,
            tgl_bayar: this.state.tgl_bayar,
            status: this.state.status,
            dibayar: this.state.dibayar,
            id_user: this.state.id_user,
        }
      

        let url = base_url + "/transaksi"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getTransaksi()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getTransaksi()
            })
            .catch(error => console.log(error))
        }
        $("#modal_transaksi").modal("hide")
    }

    saveDetail = event => {
        event.preventDefault()
        let form = {
            id_detail: this.state.id_detail,
            id_transaksi: this.state.id_transaksi,
            id_paket: this.state.id_paket,
            qty: this.state.qty
        }
        let url = base_url + "/detail"
        axios.post(url, form, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getDetail()
        })
        .catch(error => console.log(error))
        $("#modal_up").modal("hide")
    }


    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <br></br>
                    <h3 className="text-bold text-dark mt-2 text-center">Daftar Transaksi</h3>
                    <br></br>
                    <div className="row">
                    <table className="table table-bordered table-hover text-center">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID Transaksi</th>
                                <th>ID Member</th>
                                <th>Tanggal</th>
                                <th>Batas Waktu</th>
                                <th>Tanggal Bayar</th>
                                <th>Status</th>
                                <th>Dibayar</th>
                                <th>ID User</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        { this.state.transaksi.map( item => (
                            <tbody>
                                <tr>
                                    <td>{item.id_transaksi}</td>
                                    <td>{item.id_member}</td>
                                    <td>{item.tgl}</td>
                                    <td>{item.batas_waktu}</td>
                                    <td>{item.tgl_bayar}</td>
                                    <td>{item.status}</td>
                                    <td>{item.dibayar}</td>
                                    <td>{item.id_user}</td>
                                    <td>
                                        <div class="btn-group btn-group-toggle">
                                            <label class="btn btn-outline-primary" onClick={() => this.Edit(item)} >
                                                Update
                                            </label>
                                            <label class="btn btn-outline-success" onClick={() => this.Detail(item)}>
                                                Detail
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        )) }
                    </table>
                    </div>
                    <br></br>
                    <button className="btn btn-dark" onClick={() => this.Add()}>
                        Transaksi Baru
                   </button>
                   <br></br>
                   <br></br>
                </div>

                {/* modal transaksi */}
                <div className="modal fade" id="modal_transaksi">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header">
                                 <h4>Form Transaksi</h4>
                                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                             </div>
                             <form onSubmit={ev => this.saveTransaksi(ev)}>
                             <div className="modal-body">
                                     ID Member
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.id_member}
                                     onChange={ev => this.setState({id_member: ev.target.value})}
                                     required
                                     />
                                     Tanggal
                                     <input type="date" className="form-control mb-1"
                                     value={this.state.tgl}
                                     onChange={ev => this.setState({tgl: ev.target.value})}
                                     required
                                     />
                                     Batas Waktu
                                     <input type="date" className="form-control mb-1"
                                     value={this.state.batas_waktu}
                                     onChange={ev => this.setState({batas_waktu: ev.target.value})}
                                     required
                                     />
                                     Tanggal Bayar
                                     <input type="date" className="form-control mb-1"
                                     value={this.state.tgl_bayar}
                                     onChange={ev => this.setState({tgl_bayar: ev.target.value})}
                                     />
                                     Status
                                    <select class="form-control mb-1" value={this.state.status} 
                                    onChange={ev => this.setState({status: ev.target.value})} required>
                                        <option value="Baru">
                                            Baru
                                        </option>
                                        <option value="Proses">
                                            Proses
                                        </option>
                                        <option value="Selesai">
                                            Selesai
                                        </option>
                                        <option value="Diambil">
                                            Diambil
                                        </option>
                                    </select>
                                    Dibayar
                                    <select class="form-control mb-1" value={this.state.dibayar} 
                                    onChange={ev => this.setState({dibayar: ev.target.value})} required>
                                        <option value="Dibayar">
                                            Dibayar
                                        </option>
                                        <option value="Belum Bayar">
                                            Belum Bayar
                                        </option>
                                    </select>
                                     ID User
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.id_user}
                                     onChange={ev => this.setState({id_user: ev.target.value})}
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
                 
                 {/* modal detail */}
                 <div className="modal fade" id="modal_detail">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header">
                                 <h4>Detail Transaksi</h4>
                                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                             </div>
                             <div className="modal-body">
                                <table className="table table-bordered table-hover text-center">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>ID Transaksi</th>
                                            <th>ID Paket</th>
                                            <th>Jumlah</th>
                                        </tr>
                                    </thead>
                                    { this.state.detail.map( item => (
                                        <tbody>
                                            <tr>
                                                <td>{item.id_transaksi}</td>
                                                <td>{item.id_paket}</td>
                                                <td>{item.qty}</td>
                                            </tr>
                                        </tbody>
                                    )) }
                                </table>
                             </div>  
                             <div className="modal-footer">
                                <button className="btn btn-dark" onClick={() => this.Up()}>
                                    Update Detail
                                </button>
                            </div>   
                         </div>
                     </div>
                 </div>
                 {/* modal up */}
                <div className="modal fade" id="modal_up">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header">
                                 <h4>Update Detail</h4>
                                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                             </div>
                             <form onSubmit={ev => this.saveDetail(ev)}>
                             <div className="modal-body">
                                     ID Transaksi
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.id_transaksi}
                                     onChange={ev => this.setState({id_transaksi: ev.target.value})}
                                     required
                                     />
                                     Paket
                                    <select class="form-control mb-1" value={this.state.id_paket} 
                                    onChange={ev => this.setState({id_paket: ev.target.value})} required>
                                        <option selected>
                                            Pilih Paket
                                        </option>
                                        <option value="1">
                                            Kiloan
                                        </option>
                                        <option value="2">
                                            Sepatu
                                        </option>
                                        <option value="3">
                                            Karpet
                                        </option>
                                        <option value="4">
                                            Express
                                        </option>
                                        <option value="5">
                                            Kaos
                                        </option>
                                    </select>
                                     Jumlah
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.qty}
                                     onChange={ev => this.setState({qty: ev.target.value})}
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
