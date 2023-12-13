package REST;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import DAO.AccionDAO;
import implDAO.ImplAccionDAO;
import modelo.Accion;

@Path("/acciones")
public class AccionRecurso {
	
	private AccionDAO accionDAO = new ImplAccionDAO();
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Accion> getAcciones(){
		return accionDAO.getAcciones();
	}
	
	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	public void guardarAccion(Accion a) {
		accionDAO.addAccion(a);
	}
	
	@PUT
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	public void actualizarAccion(Accion a) {
		accionDAO.actualizar(a);
	}
	
	@DELETE
	@Path("/delete/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void eliminarAccion(@PathParam("id") int id) {
		accionDAO.eliminar(id);
	}
	
	
}
