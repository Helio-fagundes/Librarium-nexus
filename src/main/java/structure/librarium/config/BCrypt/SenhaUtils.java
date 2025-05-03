package structure.librarium.config.BCrypt;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class SenhaUtils {

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public SenhaUtils() {
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder(12);
    }

    public String encrypt_senha(String senha) {
        return bCryptPasswordEncoder.encode(senha);
    }

    public boolean verificar_senha(String senha, String senhaHash){
        return BCrypt.checkpw(senha, senhaHash);
    }

}
