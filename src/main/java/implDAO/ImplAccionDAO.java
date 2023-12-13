package implDAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import DAO.AccionDAO;
import modelo.Accion;
import modelo.BddConeccion;

public class ImplAccionDAO implements AccionDAO{
	
	private static final String SELECT_ALL = "SELECT * FROM acciones";
	private static final String INSERT = "INSERT INTO acciones (nombreAccion, fechaCompra, precioCompraAccion, "
			+ "cantidadAccion, costoTotalCompra) VALUES (?, ?, ?, ?, ?)";
	private static final String UPDATE = "UPDATE acciones SET nombreAccion=?, fechaCompra=?, precioCompraAccion=?,"
			+ " cantidadAccion=?, costoTotalCompra=? WHERE id=?";
	private static final String DELETE = "DELETE FROM acciones WHERE id=?";
	
	@Override
	public List<Accion> getAcciones() {
		List<Accion> acciones = new ArrayList<>();
		try (Connection connection = BddConeccion.getConexion();
	             PreparedStatement preparedStatement = connection.prepareStatement(SELECT_ALL);
	             ResultSet resultSet = preparedStatement.executeQuery()) {

	            while (resultSet.next()) {
	                Accion accion = new Accion();
	                accion.setNombre(resultSet.getString("nombreAccion"));
	                accion.setFechaCompra(resultSet.getDate("fechaCompra"));
	                accion.setPrecioCompra(resultSet.getInt("precioCompraAccion"));
	                accion.setCantidadAcciones(resultSet.getInt("cantidadAccion"));
	                accion.setCostoTotalCompra(resultSet.getInt("costoTotalCompra"));
	                acciones.add(accion);
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }
	        return acciones;
	}

	@Override
	public void addAccion(Accion a) {
		try (Connection connection = BddConeccion.getConexion();
	             PreparedStatement preparedStatement = connection.prepareStatement(INSERT)) {

	            preparedStatement.setString(1, a.getNombre());
	            preparedStatement.setDate(2, a.getFechaCompra());
	            preparedStatement.setDouble(3, a.getPrecioCompra());
	            preparedStatement.setInt(4, a.getCantidadAcciones());
	            preparedStatement.setInt(5, (int) (a.getPrecioCompra() * a.getCantidadAcciones())); 
	            preparedStatement.executeUpdate();

	        } catch (SQLException e) {
	            e.printStackTrace();
	        }
	}

	@Override
	public void actualizar(Accion a) {
		try (Connection connection = BddConeccion.getConexion();
	             PreparedStatement preparedStatement = connection.prepareStatement(UPDATE)) {

	            preparedStatement.setString(1, a.getNombre());
	            preparedStatement.setDate(2, a.getFechaCompra());
	            preparedStatement.setDouble(3, a.getPrecioCompra());
	            preparedStatement.setInt(4, a.getCantidadAcciones());
	            preparedStatement.setInt(5, (int) (a.getPrecioCompra() * a.getCantidadAcciones())); // Calcula el costo total de compra
	            preparedStatement.executeUpdate();

	        } catch (SQLException e) {
	            e.printStackTrace();
	        }
	}

	@Override
	public void eliminar(int id) {
		try (Connection connection = BddConeccion.getConexion();
	             PreparedStatement preparedStatement = connection.prepareStatement(DELETE)) {

	            preparedStatement.setInt(1, id);
	            preparedStatement.executeUpdate();

	        } catch (SQLException e) {
	            e.printStackTrace();
	        }
	}
	
}
