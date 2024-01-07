package modelo;

import java.io.Serializable;
import java.sql.Date;

public class Accion implements Serializable{

	private static final long serialVersionUID = 1L;
	private String nombre;
	private Date fechaCompra;
	private int precioCompra;
	private int cantidadAcciones;
	private int costoTotalCompra;

	public Accion() {
		
	}

	public int getCostoTotalCompra() {
		return costoTotalCompra;
	}

	public void setCostoTotalCompra(int costoTotalCompra) {
		this.costoTotalCompra = costoTotalCompra;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Date getFechaCompra() {
		return fechaCompra;
	}

	public void setFechaCompra(Date fechaCompra) {
		this.fechaCompra = fechaCompra;
	}

	public double getPrecioCompra() {
		return precioCompra;
	}

	public void setPrecioCompra(int precioCompra) {
		this.precioCompra = precioCompra;
	}

	public int getCantidadAcciones() {
		return cantidadAcciones;
	}

	public void setCantidadAcciones(int cantidadAcciones) {
		this.cantidadAcciones = cantidadAcciones;
	}

	@Override
	public String toString() {
		return "Accion [nombre=" + nombre + ", fechaCompra=" + fechaCompra + ", precioCompra=" + precioCompra
				+ ", cantidadAcciones=" + cantidadAcciones + "]";
	}
	
	
}
