# Site Berilo Brokers

Site institucional de página única da Imobiliária Berilo Brokers. HTML, CSS e JavaScript puros, sem dependências e sem etapa de build.

## Estrutura

```
berilo-site/
├── index.html            Página principal (todas as seções)
├── privacidade.html      Política de Privacidade
├── css/style.css         Estilos (cores e fontes no topo, em :root)
├── js/main.js            WhatsApp, menu, mapa, vídeo e animações
└── assets/
    ├── img/              Logo, favicon, fotos, plantas, imagem de compartilhamento
    └── video/            Coloque aqui o vídeo institucional
```

## Como substituir arquivos

Mantenha o mesmo nome de arquivo e o site atualiza sozinho.

| O que trocar | Arquivo |
|---|---|
| Logo (cabeçalho e rodapé) | `assets/img/logo-berilo.jpg` (de preferência PNG/SVG em alta resolução; se mudar a extensão, troque também no `index.html`) |
| Favicon | `assets/img/favicon.png` (64×64) e `assets/img/apple-touch-icon.png` (180×180) |
| Foto principal / poster do vídeo | `assets/img/equipe-berilo.jpg` |
| Foto da seção Sobre | `assets/img/chaveiro-berilo.jpg` |
| Imagem de compartilhamento no WhatsApp | `assets/img/og-berilo.jpg` (1200×630) |
| Depoimentos em foto | `assets/img/cliente-*.jpg` (formato story, 9:16) |
| Plantas | `assets/img/planta-*.jpg` |
| **Vídeo institucional** | `assets/video/institucional.mp4` |

**Vídeo:** basta colocar o arquivo `institucional.mp4` na pasta `assets/video/`. O site detecta o arquivo e troca a foto pelo vídeo (sem áudio, em loop). Recomendado: MP4 H.264, 1080 px de largura, até 15 segundos e menos de 5 MB.

**WhatsApp:** número e mensagem ficam no início de `js/main.js` (bloco `CONFIG`). Todos os botões usam esse valor.

**Cores e fontes:** variáveis no início de `css/style.css`.

**Crédito de desenvolvimento:** no rodapé do `index.html`, procure `data-dev` e troque "Seu Nome" e o link.

## Testar no computador

O vídeo e o mapa precisam de um servidor local (abrir o arquivo com dois cliques também funciona, mas sem vídeo).

```bash
cd berilo-site
python3 -m http.server 8000
# abra http://localhost:8000
```

Ou, com Node instalado: `npx serve .`

## Publicar

**Netlify (mais simples):** acesse app.netlify.com/drop e arraste a pasta `berilo-site` inteira. Em segundos o site fica no ar. Depois, em *Domain settings*, conecte o domínio da imobiliária.

**Vercel:** em vercel.com, *Add New → Project*, importe a pasta (ou o repositório do GitHub). Framework: *Other*. Sem comando de build. Output: a própria raiz.

**Depois de ter o domínio:** substitua `https://SEU-DOMINIO.com.br` pelo domínio real em `index.html` (canonical, Open Graph e Schema.org). Sem isso, a imagem de compartilhamento no WhatsApp não aparece.

## Informações que ainda faltam

- Domínio do site
- Vídeo institucional
- Logo em alta resolução (o atual tem 150×150 px)
- Ano de fundação e história da empresa
- Lista oficial de serviços (o site cita primeiro imóvel, lançamentos na planta, orientação na escolha e acompanhamento até as chaves, com base no Instagram e nas avaliações; confirmar se trabalham com financiamento, venda de usados, locação etc.)
- Horário completo de atendimento (hoje só "até as 21h")
- Confirmar se (11) 94551-7748 é o WhatsApp
- E-mail e Facebook
- Equipe: nome, cargo, CRECI e foto de cada corretor (as avaliações citam Santos, Vitória Liz e Oliveira). Com esses dados, a seção Equipe pode ser adicionada.
- Números de atuação (clientes atendidos, negociações) — só entram se forem reais
- Autorização dos clientes para uso das fotos e avaliações (já públicas no Google e no Instagram)

## Verificação feita

- Todos os 11 botões de WhatsApp apontam para `wa.me/5511945517748` com a mensagem padrão
- Links de rota e Google Maps abrem o endereço R. Santa Luzia, 48
- Mapa carrega só quando a seção se aproxima da tela
- Vídeo só é ativado se o arquivo existir; caso contrário, a foto permanece
- Layout testado em largura de celular (≈390 px) e desktop
- Animações desligadas para quem usa "reduzir movimento"
