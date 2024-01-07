package modelo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class BddConeccion {

	private static Connection cnn = null;

		private BddConeccion() {
			if (cnn == null) {
				String servidor = "127.0.0.1";
				String database = "PRJact";
				String usuario = "root";
				String password = "C0n5truccioN";
				int port = 13306;
				String url = "jdbc:mysql://" + servidor + ":"+port+ "/" + database;
				
				try {
					DriverManager.registerDriver(new com.mysql.cj.jdbc.Driver());
					cnn = DriverManager.getConnection(url, usuario, password);
				} catch (SQLException e) {
					System.out.println("Error de conexion!!");
					e.printStackTrace();
				}				
			}

		}

		public static Connection getConexion() {
			if(cnn == null) {
				new BddConeccion();
			}
			return cnn;
		}
		
		public static void cerrar(ResultSet rs) {
			if(rs != null)
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
		}
		
		public static void cerrar (PreparedStatement pstmt) {
				try {
					if(pstmt != null)
						pstmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
		}
		
		public static void cerrar () {
			try {
				if(cnn != null)
					cnn.close();
					cnn = null;
				} catch (SQLException e) {
					e.printStackTrace();
				}
		}
}
