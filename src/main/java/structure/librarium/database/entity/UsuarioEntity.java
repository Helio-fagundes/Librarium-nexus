package structure.librarium.database.entity;

import jakarta.persistence.*;
import org.springframework.hateoas.RepresentationModel;

import java.util.UUID;

@Entity
@Table(name = "usuario")
public class UsuarioEntity extends RepresentationModel<UsuarioEntity> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id_usuario;
    private String cpf;
    private String adress;
    private String tell;

    public UUID getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(UUID id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getTell() {
        return tell;
    }

    public void setTell(String tell) {
        this.tell = tell;
    }
}
