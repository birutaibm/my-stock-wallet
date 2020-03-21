Projeto para registro de compras e vendas de ações no Brasil.

Este projeto está em desenvolvimento, portando não é o momento de utilizá-lo.
As funcionalidades previstas são:
- Permitir o cadastro e consulta da posição atual, que consiste de um ticker uma quantidade e valor total da aquisição, que será utilizado para fins de apuração de imposto de renda.
- Permitir o registro e consulta de notas de corretagem, compostas por sua data, valor total e uma lista de transações, cada uma com direção (Compra ou Venda), ticker, quantidade e preço unitário. Ao cadastrar uma nota de corretagem:
-- O valor das taxas será distribuido pelas movimentações, e cada movimentação será salva.
-- As informações de posição serão atualizada automaticamente;
-- Caso haja uma venda serão calculados automaticamente as informações de imposto de renda (valor total da venda e lucro/prejuiso da operação).
- Permitir a consulta das movimentações feitas.
- Permitir a consulta das informações de imposto de renda.

O repositório reune dois projetos: backend e web, além de um diretório compartilhado que reune informações importantes para ambos os projetos.
Tudo está sendo escrito com typescript, sendo o backend feito em Node e o web em ReactJS.