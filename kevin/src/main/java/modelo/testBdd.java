package modelo;

import java.sql.Connection;

public class testBdd {

public static void main(String[] args) {
		
		Connection cnn = BddConeccion.getConexion();
		if(cnn != null) {
			System.out.println("Tenemos conexion");
		} else {
			System.out.println("NO tenemos conexion");
		}
	}
}



