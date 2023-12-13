package DAO;
import java.util.List;

import modelo.Accion;

public interface AccionDAO {
	
	public List<Accion> getAcciones();
	public void addAccion(Accion a);
	public void actualizar(Accion a);
	public void eliminar(int id);
	
}
