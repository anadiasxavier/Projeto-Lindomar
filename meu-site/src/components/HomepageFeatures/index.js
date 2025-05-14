import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Ana Xavier',
    image: '/img/fotoAna.svg',
    description: <>Olá, meu nome é Ana Xavier, tenho 18 anos e atualmente trabalho como jovem aprendiz na Robert Bosch.
     Estou cursando o curso técnico em Desenvolvimento de Sistemas e, no projeto de documentação, fui responsável pela criação e descrição das Models,
     garantindo que as informações fossem transmitidas de forma clara e objetiva para os desenvolvedores. </>,
  },
  {
    title: 'Giovana Cristina',
    image: '/img/fotoGiovana.svg',
    description: <>Meu nome é Giovana Cristina, tenho 17 anos e sou aprendiz na Robert Bosch LTDA como desenvolvedora de sistemas.
     Nesta documentação fiquei responsável especificamente com as views do projeto com o qual é o documento responsável por todas as funcionalidades e especificações do projeto.
      Ao iniciar, navegue por esse mar de aprendizado e experiências! </>,
  },
  {
    title: 'Luana Grandi',
    image: '/img/fotoLuana.svg',
    description: <>Eu sou a Luana, tenho 17 anos e atualmente sou aprendiz da Robert Bosch. 
    Estou cursando Desenvolvimento de Sistemas no Senai Roberto Mange. Neste projeto fiquei 
    responsável pela explicação dos Serializers, para que desenvolvedores iniciantes possam entender com mais facilidade como o
     Serializers funcionam. </>,
  },
  {
    title: 'Nicolas Vilela',
    image: '/img/fotoNicolas.svg',
    description: <>Eu sou Nicolas Vilela tenho 18 anos de idade, sou um programador Full-Stack. Tenho dois anos de experiencia na área onde comecei como um estudante na ETEC,
     nesta trilha comecei a gostar muito de projetos em geral, e entendo que a documentação é a parte essencial de tal.
     Neste projeto documentei as urls com foco principal em deixar claro para um possível desenvolvedor como fazer os endpoints. </>,
  },
];

function Feature({image, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={image} className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
