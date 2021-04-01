import React, { Component } from "react";
import "./Index.css";
import 'bootstrap/dist/css/bootstrap.css';
import pin from '../Img/pin-white.png'
import store from '../Img/store.png'
import gps from '../Img/compass.png'
import loja1 from '../Img/loja-1.png'
import loja3 from '../Img/loja-3.png'
import loja2 from '../Img/loja-2.png'
import centauro from '../Img/centauro.png'
import Swal from 'sweetalert2'

const lojas = []
const imagens = [loja1, loja2, loja3]
    function compare(a,b) {
        if (a.distancia < b.distancia)
           return -1;
        if (a.distancia > b.distancia)
          return 1;
        return 0;
      }      
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      function cleanArray(lojas){
          lojas.length = 0
      }
      
export default class Index extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            posicao1: "",
            posicao2: "",
            lojasQtd: 0,
            lista: [],
            verificar: true,
            show: false,
        }     
        this.gerarLojas =  this.gerarLojas.bind(this); 
    }

    
    calcular(lista){
        const size = lista.length;
         for(let i = 0; i < size && this.state.verificar === true;){
            if((lista[i].value && lista[i+1].value ) === ""){
                this.setState({verificar: false})
                i++;
            } else {
                const dx = Math.pow(lista[i].value - parseInt(this.state.posicao1), 2);
                const dy = Math.pow(lista[i+1].value - parseInt(this.state.posicao2), 2);            
                const dab = Math.sqrt(dx + dy);            
                lojas.push({loc1: lista[i].value, loc2: lista[i+1].value, distancia: Math.round(dab)})
                i = i+ 2;
            }
            
        }
    }

    verificar(){
        if (this.state.verificar === false){
            Toast.fire({
                title: 'Erro!',
                text: 'Confira os campos das lojas',
                icon: 'error',
              })
              this.setState({show: false})
        } else {
            console.log('oi')
            lojas.sort(compare);
            lojas.slice(0, 3); 
            this.setState({lista: lojas}) 
            this.setState({show: true})
            cleanArray(lojas);
        }
    }
   async gerarLojas(){    
        await this.setState({verificar: true})
        if(this.state.posicao1 === "" || this.state.posicao2 === ""){
            this.setState({verificar: false})
        }
        const nodeList = document.querySelectorAll('.loja > .row > input');        
        const nodelistToArray = Array.apply(null, nodeList);       
        console.log(nodelistToArray) 
        await this.calcular(nodelistToArray); 
        return this.verificar();
    }
    renderLojaRow(){       
        return (
        <div className="loja">
            <div className="row">
                <div className="col"><label className="label-store">Posição X</label></div>
                <div className="col"><label className="label-store">Posição Y</label></div>
            </div>
            <div className="row">
            <img src={pin} className="icon-pin"/><input type="number" className="input"/> &nbsp;
            <input type="number" className="input"/> 
            </div>
        </div>)
    }
    retorno(lista){
        return lista.map((val, index) => {
            return(
                <div className="card-loja">
                <img src={imagens[index]} width="60%"/>
                <div className="legenda-card">
                    <h3>Loja {index+1}</h3>
                    <label>RUA MARCELO DELGADO, 18</label><br/>                                
                    <div className="footer-card"><div className="subtitle-card">{val.distancia} METROS DE DISTÂNCIA</div> <div className="geo-card">[{val.loc1}, {val.loc2}]</div></div>
                    
                </div>
            </div>
            )
        })

    }

    render() { 
        let lojaRow = []
        for(let i = 0; i < this.state.lojasQtd; i++){
            lojaRow.push(i);
        }
        return ( 
            <div id="Index">
                <div className="row p-3"><img src={centauro} width="9%"/></div>
                <div className="row jc-sa">
                <div className="square-green">
                    <div className="mb-3">
                        <h3>Onde você está?</h3>
                        <img src={gps} className="icon"/><input type="number" className="input" onChange={(e) =>this.setState({posicao1: e.target.value, show: false})} placeholder="Posição X"/> &nbsp;
                        <input type="number" className="input" onChange={(e) =>this.setState({posicao2: e.target.value, show: false})} placeholder="Posição Y"/> 
                    </div>
                    <h3>Quantas lojas tem na região?</h3>
                    <img src={store} className="icon"/><input type="number" className="input" id="e" onChange={(e) =>{this.setState({lojasQtd: e.target.value})}} />
                    <div className="lojas">{lojaRow.map(this.renderLojaRow)} </div>                               
                    <button className="btn-calcular" onClick={() => this.gerarLojas()}>Calcular</button>
                </div>
                <div className="square-white " id="lojas" style={{display: this.state.show? 'block' : 'none'}}>
                    { this.retorno(this.state.lista) }
                        </div>
                </div>              
           </div>
        )        
    }
}