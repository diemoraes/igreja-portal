type Membro = {
    nome: string;
    nascimento: string;
  };
  
  export function aniversariosDoMes(membros: Membro[]) {
    const mesAtual = new Date().getMonth();
  
    return membros.filter((m) => {
      const data = new Date(m.nascimento);
      return data.getMonth() === mesAtual;
    });
  }
  
  export function proximosAniversarios(
    membros: Membro[],
    dias = 7
  ) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
  
    return membros.filter((m) => {
      const nascimento = new Date(m.nascimento);
      const aniversarioEsteAno = new Date(
        hoje.getFullYear(),
        nascimento.getMonth(),
        nascimento.getDate()
      );
  
      const diff =
        (aniversarioEsteAno.getTime() - hoje.getTime()) /
        (1000 * 60 * 60 * 24);
  
      return diff >= 0 && diff <= dias;
    });
  }
  