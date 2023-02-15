import { defineStore } from 'pinia';
import img1 from '@/assets/temp/home/8.jpg';
import img2 from '@/assets/temp/home/9.jpg';
import img3 from '@/assets/temp/home/10.jpg';

export const twoJinDynasty = defineStore('twoJinDynasty', {
  state: () => {
    return {
      articles: [
        {
          id: 0,
          title: '炫富的下场',
          desc: '石崇不过是五品散骑常侍，只是一个低级士族，他的财富甚至不是来自祖辈积累,而是来自在自己的地盘上(荆州)私建收费站,对过往行人收取过路费。最后，石崇被斩杀于洛阳东市，临死的时候石崇感叹:这些人杀我，还不是为了我的钱?',
          img: img1,
          paragraphs: [
            '在历史的长焦镜头中，金钱永远可以代表利益，所谓“民心”不过是给大部分人一个公平赚钱的机会，这才是-个社会最大的“道德" ;在绚丽多姿的历史长卷中，金钱又永远不可能成为主角，它只是财富的一个符号，对与错，只在用钱的人。',
            '好了，从西周说起吧。',
            '西周是一个混沌世界，不要说金银，就是青铜产量也不大。没有金银的世界，什么才是钱呢?',
            '既见君子，赐我百朋。————《诗经》',
            '其中的“朋”指代贝壳，与很多国家和民族- -样,贝壳是中国的第一代货币，后来,用青铜铸成的贝壳也被用作货币。对统治者来说，贝壳远远担负不起驾驭天下的责任,那么西周王朝要以什么方式统治国家呢?',
            '大部分人对西周的了解来自《封神榜》，也就是武王伐纣。实际上，周武王姬发统治的时间很短(既克商,两年,王崩),他根本来不及建立统治国家的框架。姬发死后,其弟姬旦，也就是周公即位(篡位)。这位孔子常常于梦里神交的先贤才是西周制度真正的奠基者，他解决了如何统治天下的问题。',
            '姬旦选择了当时最有效、最简单的统治方式封建:为确保对国家的统治，姬旦共封七十一国，其中姬姓五十三国，封国在地方替周王管理属国。',
            '封建封建，封而建之。周王给下属或者子弟封地，让这些人永远效忠王室。在没钱的时代这也是一种交易，我们姑且将之称为“恩惠换忠诚”。',
            '在封建制下，无数实力相近的封臣，任何一个都没有动力背叛周王，更无法单独对抗整个部族。这种情形颇类似于经济学中的完全竞争假设:无数同质的生产者(邦国太小，而且很多),在一个信息充分的市场(封建君主都是亲戚，知根知底)上出售同一种产品(简单的军事和经济支持)，于是，价格可以在瞬时达到均衡( 稳定的统治)。',
            '这种恩惠能换来封臣对君王的忠诚吗?',
            '答案是:不能。',
            '同样可以用现代经济学的观点进行解释，王室对封臣的恩惠存在边际递减效应:王室封赏得越多，封臣对忠于王室会越来越不感兴趣。',
            '西周王室真正控制封臣的，是其缔造的精神统治，即“王德”一这才 是整个西周封建统治的根基。武王伐纣,在很大程度上靠的就是自己的“王德”和商纣的“无德"。一有一无， 才使得牧野决战中殷商军队倒戈相向。',
            '西周王室真正控制封臣的，是其缔造的精神统治，即“王德”一这才 是整个西周封建统治的根基。武王伐纣,在很大程度上靠的就是自己的“王德”和商纣的“无德”。一有一无，才使得牧野决战中殷商军队倒戈相向。',
            '这个世界上，没有什么人不会被统治，一个没有统治者的世界才真的可怕。重要的是，作为统治者的“王”，有着什么样的“德"。',
            '西周初年出土的青铜器铭文.清楚地告诉了我们周武王、周公信奉的“王德”:敬天、保民。',
            '在这里，“王”只是一一个凡人，“王”之上还有“天”,所有凡人都必须有所敬畏。在天命面前统治者必须修明德行，如果失德，即使已有天命，亦会被上天抛弃。这是亘古不变的真理:此前、此中、此后，无论多么辉煌的文化、多么骁勇的铁骑，一旦统治者失德，帝国最终都将沦丧。',
            '王之贵，贵在有尊严、责任、勇气和自律，历代周王农耕稼穑必须亲力亲为;战场上一马当先的也不是命运悲惨的奴隶，而是头顶桂冠的王，数代周王都在对异族犬戎的征战中喋血沙场。',
            '王者必须去竞争，不争何以为王? ',
            '竞争又必须有风度，宁可承担养虎为患的后果也不能失去品行。与后世“斩草要除根”的理念不一致，周武王灭商之后，纣的儿子武庚被封在商朝国都朝歌为王,国号“邶”。即使是商纣王这个亡国之君，明知周文王可能是商朝的最大祸根，照样要.依约放虎归山。武王灭商与后来的秦灭六国是两种截然不同的逻辑:秦灭六国，杀尽王子王孙;牧野之战，纣王眼见兵败，身着白玉衣，走向了鹿台自焚。在很大程度上，殷商军事、经济实力都还在，纣王自尽，只是以一种体面的方式承认了自己的失败。',
            '封建王朝的每-个皇帝都可以自我标榜有“王德”，但是,我坚信只有西周统治者才真正相信天命悠悠!因为，在那个刚刚逃离蒙昧的时代，所有人都坚信自己的命运被上天掌握，王朝的命运同样如此。',
            '对权力没有任何制约的西周，“王德”是封建统治者最后的底线。这种“王德”对天命的畏惧延续了周王朝近千年的生命，此后，无论春秋五霸如何强盛，都只能挟天子以令诸侯，再强的诸侯都必须获得王室认可。这-点，颇类似于西欧或者日本王位千年一系，绝不是“皇帝轮流做，明年到我家”的强盗逻辑。',
            '很遗憾，“王德”对人的约束不能用经济学理论解释,这一点颇类似于今天的行为经济学一明明知道捐赠对自己不利，还是有人心系天下。“王德”为一个社会提供了最基本的生存保障，如果每一个人都从心底信服“王德”，那么，就不会有人想去打破这个规则，每-一个人的生存也就有了最后的底线。',
            '凡是试图打破这条底线的举动，都是全社会所不允许的。',
            '周公之后，西周终于到达了“成康之治”的巅峰,四十余年没有案件审理，人们生活在一-片和睦之中(刑错四十余年不用，....民和睦， 颂声兴)。',
            '丕显成康，上帝是皇;自彼成康，奄有四方，斤斤其明。--《诗经.周颂.执竞》'
          ]
        },
        {
          id: 1,
          title: '司马炎的绝招',
          desc: '江南兴起的小农经济创造了一个巨大的市场。相反，如果财富仅仅集中于士族高门，购买力也就必然集中于一小撮人，这样的社会结构除了能造就奢侈品市场，普通行业能兴盛才真的奇怪。',
          img: img2,
          paragraphs: [
            '西周王朝灭亡之后的两千多年里，人们不断思索:若诚如孔子所言，西周是一个政治清明、道德高尚、制度合理的王朝，为何这样的王朝也会在历史长河中湮灭?',
            '答:如果没有外敌，那么西周王室很有可能成为千年- -系的中华帝王家族，中华的历史可能会被完全改写。遗憾的是,历史不容假设,周王朝的西部有-一个强大的异族一犬戎，这个民族的存在使得西周依靠“王德”维持统治的愿望注定要落空。',
            '西周与犬戎的边界在今天“常武一彬县” 一线，距离西周王畿镐京只有- -百二十公里,而西周王室军事主力东八师(成周八师)却驻扎在东都洛邑,用来防止商人反叛。更可怕的是，犬戎一次能派出数百辆战车与周人作战，文明水平、经济实力与西周根本不相上下。',
            '了解西周灭亡的原因又绝非易事,西周的大部分原始史料来自出土青铜器的铭文,青铜器的作用是祭祀祖先，让古人在祭祀的时候刻上自己的糗事，可能性是很小的。至于《史记》，甚至更晚的一些二手资料，只要稍加分析就知道太不靠谱了。',
            '《史记》首先将西周灭亡归咎于周厉王。在《史记》的描述中，周厉王是- -个贪婪的人，他骄奢淫逸，还不准别人说他坏话。人们在路上都不敢说话，只能互相对视以表达自己对周厉王的不满(国人莫敢言，道路以目，....防民之口，甚于防川)。',
            '真的是这么样吗?',
            '成康之治后，依次有昭、穆、共、懿、孝、夷、厉七代周王，西周衰败自昭王始。成康之治时，周朝面对犬戎还处于攻势，但到周昭王时就完全不是这么回事了，周昭王本人死于征伐犬戎的路途上，王畿镐京的主力军队西六师也丧失殆尽。周穆王时期，犬戎已经从被动防守转为主动进攻。',
            '一旦西周对犬戎从攻势变为守势，王室也就难以维持在诸侯中的权威。',
            '为防止犬戎西犯,周穆王开始不断违背原则加强对西部诸侯的封赏。“恩惠换忠诚”本来就没有确定标准，赐予西部诸侯的土地又只能从王室渭河流域的土地中分割，赏赐的土地越多，后续赏赐的可能性就越小，王室自身经济基础也就越弱。从青铜铭文来看，周穆王为取悦西部诸侯所采取的行为已经超乎西周初年的想象:册封之礼，祭祀所用牛羊大约是西周初年的十至十五倍;西部诸侯的王妃也远远超出了应有的数量。',
            '我们同样无法通过青铜铭文估计王室这种行为到底造成了多少恶果，不过我们可以进行一些比较。周公或成康时代,王室的赏赐都是成片的土地,这时赏赐被称为“士”;到了周穆王时期，青铜铭文中只记载王室赏赐小片土地，被称为“田”。现存出土文物中有一件“大克鼎”，大克鼎记载了厉王前期的一次赏赐，赏赐给诸侯七块“田”，而且都在边缘地带。', '可能是，周穆王时代王室已经- -蹶不振，王室已经拿不出像样的封土了，周穆王只能提高对西部诸侯的特殊礼遇。在重礼的西周，这既是对其他封臣的不公平，也是王室自己在败坏“王德”。',
            '于是《诗经》记录下另一个恶果:既然王室带头打破规矩，其他人还有什么不能做的呢?君臣无义(乱之又生，君子信谗)父子不亲( 天之生我，我辰安在)、夫妻无情(将安将乐，弃予如遗)兄弟无序(终鲜兄弟,维予与女)、朋友无信(朋友已谮,不胥以穀)',
            '父子、夫妻、兄弟、朋友,都是人最应该珍视的关系，-一个人如果连自己的兄弟、朋友，甚至父母、伴侣都不放在眼里，这是一个什么样的人?如果每个人都如此，这又是一一个什么样的社会?如果-一个社会里人们只信金钱，如何能指望君王、诸侯甚至普通人可以“明德”、可以“保民" ?',
            '司马迁之所以大骂周厉王，原因还在于周厉王推行了“专利”制度。其实，西周铭文甚至后世典籍始终都没说清楚究竟周厉王的“专利”是个什么东西,只是说他“专山林川泽之利”。周厉王很可能把诸侯的山林川泽收归国有(自己所有),凡是在山上砍柴的、打猎的都要向王室纳税。看起来，周厉王敛财是确定无疑的，所以，司马迁认为此人是一个暴君。',
            '不是周厉王贪婪，而是王室实在太穷了。',
            '周厉王前期，封臣的势力已经超越了王室，多次有封臣击溃犬戎的记录，而王室军事主力成周八师却在战场上屡屡溃败。现存西周文物中著名的“多友鼎"，反复提到一位叫“武公”的诸侯力挽狂澜，派出自己的战车解救被围困的王师。周厉王的命令只能下达给武公，武公再指挥部将作战;胜利后，周厉王的赏赐也只能给武公。也就是说，周厉王自己不可能指挥军队击溃犬戎。',
            '万乘之国弑其君者，必千乘之家!',
            '所以，周厉王要推行“专利”。在大骂周厉王之前让我们先看看“专利”究竟盘剥了谁，究竟是谁在山林川泽里砍柴、打猎。',
            '据《礼制●王制》记载,西周山川林泽本来是公共土地,任何人都可以在其中砍柴、打猎，后来，随着封王势力增强，他们封死了普通人进山的道路，把山川林泽视为自己的禁脔。周厉王推行“专利”，就是任用荣夷公从封王手里收缴山川林泽，或者让占用山川林泽的封王定期向王室纳税。“专利”不过是周厉王为挽救日渐衰亡的王室而从诸侯的碗中分- -杯羹,如果王室真的建立了一个强有力的王权，最后被赶出京畿的就不是周厉王了。',
            '在异族入侵压力的威逼下，西周王室被迫培育了强势诸侯，一旦诸侯之间力量失去平衡，“王德”便失去了自身的魅力。',
            '西周王室失去了财富、失去了王德，也很快会失去江山。',
            '司马迁提到的第二个西周亡国之君是周幽王，附带给周幽王编派了一个“烽火戏诸侯”的罪名。',
            '《史记》记载了这样-一个故事:周幽王经常无故点燃烽火，诸侯闻讯而来的时候，却没有发现王朝面临军事威胁。原来，周幽王有一个妃子叫褒姒，每当褒姒见到城下疲于奔命的诸侯，就会笑得很开心。后来，犬戎真的对周朝发动进攻，周幽王点燃烽火的时候，再也没有诸侯赶来勤王。',
            '现在，我们来分析一下“烽火戏诸侯”的故事(大概由于破绽太多，以至于今天的正史研究将这个故事直接列为传说)。',
            '《史记》之前的《国语》和《吕氏春秋》对褒姒的故事都有记载,最初的原型则是《诗经》里几句无关紧要的诗词。',
            '《国语》的版本最不可信:褒姒是邪神转世，与商纣王的妲己一样，她来到世间就是为了惩罚西周王朝失德，她在人间的帮手叫作“虢石父”，两人狼狈为奸，败坏西周政务。至于《吕氏春秋》，情节与《国语》类似，只是故事更为简单，而且提到一句:周幽王为了取悦褒姒，经常亲自为她击鼓(幽王欲褒姒之笑也，因数击鼓)。',
            '太史公司马迁真牛，愣是把《吕氏春秋》里的“击鼓”改为“烽火”。太史公司马迁真牛，愣是把《吕氏春秋》里的“击鼓”改为“烽火”',
            '这样做，不是太史公粗心，而是古代史学家们必须为西周找到-一个灭亡的理由。否则，西周又怎么可能成为顶礼膜拜的典范?',
            '只有展示出“妖女祸国”这样一个古老的传说，西周王朝在历史上的声望与其耻辱的结局才能调和，史学家才能继续把西周供奉在神坛之上。周幽王不是灭亡西周的终极杀手，一个绵延数百年的王朝，不会因为某-一个人 振兴，更不可能因为某-一个人衰败。指责“妖女误国”，不过是历代史家标榜自己学说的- -种障眼法。',
            '《竹书纪年》《国语》和西周末年的青铜铭文确实提到了很多女人，-群漂亮的女人，她们或依附于权贵,或围绕在诸侯周围,也许其中有一个人就叫褒姒。对世界来说，年轻漂亮的女人也是一-种稀缺资源，如果这种稀缺资源围绕在封建统治者周围,那么，对一个社会来说就绝非幸事。她们叫什么并不重要，重要的是这些漂亮女人以年轻貌美作为资本跻身统治阶层，而身居高位者从她们那里获得了愉悦。',
            '这是怎样一种愉悦',
            '放弃了祖先，放弃了“王德”，甚至放弃了天下，一旦这种风气成为时尚，乱世之相必生(乱匪降自天，生自妇人)。',
            '周幽王的王后叫“申后”，来自西部另一一个强势诸侯一申国。按西周宗法制度,申后的儿子一宜臼是嫡长子，也是法定的王位继承人。《竹书纪年》还记载了周幽王的一个王妃，也许就是传说中的褒姒，她的儿子叫“伯服”，按宗法制度，伯服没有可能成为周王。',
            '我的判断是，一旦宜臼成为周王，周王室就可能完全落入西部诸侯的控制。周幽王不糊涂，他知道这件事的后果。',
            '周幽王时代的铭文还记载了- -位权倾天下的诸侯，这个人在周宣王时代就被册封为“皇父”，周幽王时代被加封为“太师尹氏”，当权四十多年，能号令诸侯。周幽王五年(公元前777年),犬戎再度入侵西周王畿镐京,正是这位皇父率领诸侯击溃了犬戎。',
            '此时，周幽王却已经穷得叮当响，再没有可能用“恩惠”来换皇父的“忠诚”。',
            '既然赏无可赏，干脆就罚吧。',
            '公元前777年，皇父被周幽王赶出王畿镐京。之后，周幽王获得了暂时的胜利，废黜了来自西部诸侯国的王后，并立褒姒之子伯服为王位继承人。.',
            '这是一个短暂的胜利，却是西周灭亡的开始。',
            '周幽王之所以能驱逐皇父，不是因为实力，而是因为周王的位置,这个位置代表着道德制高点。一旦整个社会不再信奉道德，那么道德制高点的号召力便降为零，剩余的就要靠实力说话。',
            '失去“王德”的社会,人们只会臣服于强人，只有利益才是真正的信仰。也就是说，这个时候的西周几乎是一种丛林社会，只有赤裸裸的暴力才能制约这些诸侯了。对诸侯来说，周幽王不过就是一个名号，没一起喝过酒、没一起拼过命，凭什么要听你的命令?',
            '无疑，周幽王也看到了这一点。',
            '将皇父赶出镐京的同年，周幽王在太室山与东部诸侯结盟，希望依靠东部诸侯对抗西部诸侯。东部诸侯以殷商移民为主，曾经是西周王室防范的主要敌人。此时，周王室很可能已经到了众叛亲离的地步，周幽王只好放下周王的架子，把自己与东部诸侯摆在了同- -起跑线上。',
            '实力做主的时代，皇父、申后也不会忍受失败，次年，申后的父亲与皇父同时起兵讨伐周幽王，要求立宜臼为王位继承人，更可恨的是，这两位诸侯请来了宿敌犬戎作为帮衬，进攻周京畿。',
            '周幽王根本没有真正的实力,重建的成周八师在皇父、犬戎联军面前-一触即溃,只稍作抵抗镐京便沦陷，东部诸侯并未出兵相救。',
            '公元前771年，周幽王在镐京附近的骊宫被杀，西周亡。'
          ]
        },
        {
          id: 2,
          title: '一钱杀二士',
          desc: '东晋初年，官府特准铸币权就是那个桃子，江南豪门则是争抢桃子的勇士。最后，江南豪门势力在铸币权争夺战中全部衰败。',
          img: img3,
          paragraphs: [
            '西周王朝灭亡之后的两千多年里，人们不断思索:若诚如孔子所言，西周是一个政治清明、道德高尚、制度合理的王朝，为何这样的王朝也会在历史长河中湮灭?',
            '答:如果没有外敌，那么西周王室很有可能成为千年- -系的中华帝王家族，中华的历史可能会被完全改写。遗憾的是,历史不容假设,周王朝的西部有-一个强大的异族一犬戎，这个民族的存在使得西周依靠“王德”维持统治的愿望注定要落空。',
            '西周与犬戎的边界在今天“常武一彬县” 一线，距离西周王畿镐京只有- -百二十公里,而西周王室军事主力东八师(成周八师)却驻扎在东都洛邑,用来防止商人反叛。更可怕的是，犬戎一次能派出数百辆战车与周人作战，文明水平、经济实力与西周根本不相上下。',
            '了解西周灭亡的原因又绝非易事,西周的大部分原始史料来自出土青铜器的铭文,青铜器的作用是祭祀祖先，让古人在祭祀的时候刻上自己的糗事，可能性是很小的。至于《史记》，甚至更晚的一些二手资料，只要稍加分析就知道太不靠谱了。',
            '《史记》首先将西周灭亡归咎于周厉王。在《史记》的描述中，周厉王是- -个贪婪的人，他骄奢淫逸，还不准别人说他坏话。人们在路上都不敢说话，只能互相对视以表达自己对周厉王的不满(国人莫敢言，道路以目，....防民之口，甚于防川)。',
            '真的是这么样吗?',
            '成康之治后，依次有昭、穆、共、懿、孝、夷、厉七代周王，西周衰败自昭王始。成康之治时，周朝面对犬戎还处于攻势，但到周昭王时就完全不是这么回事了，周昭王本人死于征伐犬戎的路途上，王畿镐京的主力军队西六师也丧失殆尽。周穆王时期，犬戎已经从被动防守转为主动进攻。',
            '一旦西周对犬戎从攻势变为守势，王室也就难以维持在诸侯中的权威。',
            '为防止犬戎西犯,周穆王开始不断违背原则加强对西部诸侯的封赏。“恩惠换忠诚”本来就没有确定标准，赐予西部诸侯的土地又只能从王室渭河流域的土地中分割，赏赐的土地越多，后续赏赐的可能性就越小，王室自身经济基础也就越弱。从青铜铭文来看，周穆王为取悦西部诸侯所采取的行为已经超乎西周初年的想象:册封之礼，祭祀所用牛羊大约是西周初年的十至十五倍;西部诸侯的王妃也远远超出了应有的数量。',
            '我们同样无法通过青铜铭文估计王室这种行为到底造成了多少恶果，不过我们可以进行一些比较。周公或成康时代,王室的赏赐都是成片的土地,这时赏赐被称为“士”;到了周穆王时期，青铜铭文中只记载王室赏赐小片土地，被称为“田”。现存出土文物中有一件“大克鼎”，大克鼎记载了厉王前期的一次赏赐，赏赐给诸侯七块“田”，而且都在边缘地带。', '可能是，周穆王时代王室已经- -蹶不振，王室已经拿不出像样的封土了，周穆王只能提高对西部诸侯的特殊礼遇。在重礼的西周，这既是对其他封臣的不公平，也是王室自己在败坏“王德”。',
            '于是《诗经》记录下另一个恶果:既然王室带头打破规矩，其他人还有什么不能做的呢?君臣无义(乱之又生，君子信谗)父子不亲( 天之生我，我辰安在)、夫妻无情(将安将乐，弃予如遗)兄弟无序(终鲜兄弟,维予与女)、朋友无信(朋友已谮,不胥以穀)',
            '父子、夫妻、兄弟、朋友,都是人最应该珍视的关系，-一个人如果连自己的兄弟、朋友，甚至父母、伴侣都不放在眼里，这是一个什么样的人?如果每个人都如此，这又是一一个什么样的社会?如果-一个社会里人们只信金钱，如何能指望君王、诸侯甚至普通人可以“明德”、可以“保民" ?',
            '司马迁之所以大骂周厉王，原因还在于周厉王推行了“专利”制度。其实，西周铭文甚至后世典籍始终都没说清楚究竟周厉王的“专利”是个什么东西,只是说他“专山林川泽之利”。周厉王很可能把诸侯的山林川泽收归国有(自己所有),凡是在山上砍柴的、打猎的都要向王室纳税。看起来，周厉王敛财是确定无疑的，所以，司马迁认为此人是一个暴君。',
            '不是周厉王贪婪，而是王室实在太穷了。',
            '周厉王前期，封臣的势力已经超越了王室，多次有封臣击溃犬戎的记录，而王室军事主力成周八师却在战场上屡屡溃败。现存西周文物中著名的“多友鼎"，反复提到一位叫“武公”的诸侯力挽狂澜，派出自己的战车解救被围困的王师。周厉王的命令只能下达给武公，武公再指挥部将作战;胜利后，周厉王的赏赐也只能给武公。也就是说，周厉王自己不可能指挥军队击溃犬戎。',
            '万乘之国弑其君者，必千乘之家!',
            '所以，周厉王要推行“专利”。在大骂周厉王之前让我们先看看“专利”究竟盘剥了谁，究竟是谁在山林川泽里砍柴、打猎。',
            '据《礼制●王制》记载,西周山川林泽本来是公共土地,任何人都可以在其中砍柴、打猎，后来，随着封王势力增强，他们封死了普通人进山的道路，把山川林泽视为自己的禁脔。周厉王推行“专利”，就是任用荣夷公从封王手里收缴山川林泽，或者让占用山川林泽的封王定期向王室纳税。“专利”不过是周厉王为挽救日渐衰亡的王室而从诸侯的碗中分- -杯羹,如果王室真的建立了一个强有力的王权，最后被赶出京畿的就不是周厉王了。',
            '在异族入侵压力的威逼下，西周王室被迫培育了强势诸侯，一旦诸侯之间力量失去平衡，“王德”便失去了自身的魅力。',
            '西周王室失去了财富、失去了王德，也很快会失去江山。',
            '司马迁提到的第二个西周亡国之君是周幽王，附带给周幽王编派了一个“烽火戏诸侯”的罪名。',
            '《史记》记载了这样-一个故事:周幽王经常无故点燃烽火，诸侯闻讯而来的时候，却没有发现王朝面临军事威胁。原来，周幽王有一个妃子叫褒姒，每当褒姒见到城下疲于奔命的诸侯，就会笑得很开心。后来，犬戎真的对周朝发动进攻，周幽王点燃烽火的时候，再也没有诸侯赶来勤王。',
            '现在，我们来分析一下“烽火戏诸侯”的故事(大概由于破绽太多，以至于今天的正史研究将这个故事直接列为传说)。',
            '《史记》之前的《国语》和《吕氏春秋》对褒姒的故事都有记载,最初的原型则是《诗经》里几句无关紧要的诗词。',
            '《国语》的版本最不可信:褒姒是邪神转世，与商纣王的妲己一样，她来到世间就是为了惩罚西周王朝失德，她在人间的帮手叫作“虢石父”，两人狼狈为奸，败坏西周政务。至于《吕氏春秋》，情节与《国语》类似，只是故事更为简单，而且提到一句:周幽王为了取悦褒姒，经常亲自为她击鼓(幽王欲褒姒之笑也，因数击鼓)。',
            '太史公司马迁真牛，愣是把《吕氏春秋》里的“击鼓”改为“烽火”。太史公司马迁真牛，愣是把《吕氏春秋》里的“击鼓”改为“烽火”',
            '这样做，不是太史公粗心，而是古代史学家们必须为西周找到-一个灭亡的理由。否则，西周又怎么可能成为顶礼膜拜的典范?',
            '只有展示出“妖女祸国”这样一个古老的传说，西周王朝在历史上的声望与其耻辱的结局才能调和，史学家才能继续把西周供奉在神坛之上。周幽王不是灭亡西周的终极杀手，一个绵延数百年的王朝，不会因为某-一个人 振兴，更不可能因为某-一个人衰败。指责“妖女误国”，不过是历代史家标榜自己学说的- -种障眼法。',
            '《竹书纪年》《国语》和西周末年的青铜铭文确实提到了很多女人，-群漂亮的女人，她们或依附于权贵,或围绕在诸侯周围,也许其中有一个人就叫褒姒。对世界来说，年轻漂亮的女人也是一-种稀缺资源，如果这种稀缺资源围绕在封建统治者周围,那么，对一个社会来说就绝非幸事。她们叫什么并不重要，重要的是这些漂亮女人以年轻貌美作为资本跻身统治阶层，而身居高位者从她们那里获得了愉悦。',
            '这是怎样一种愉悦',
            '放弃了祖先，放弃了“王德”，甚至放弃了天下，一旦这种风气成为时尚，乱世之相必生(乱匪降自天，生自妇人)。',
            '周幽王的王后叫“申后”，来自西部另一一个强势诸侯一申国。按西周宗法制度,申后的儿子一宜臼是嫡长子，也是法定的王位继承人。《竹书纪年》还记载了周幽王的一个王妃，也许就是传说中的褒姒，她的儿子叫“伯服”，按宗法制度，伯服没有可能成为周王。',
            '我的判断是，一旦宜臼成为周王，周王室就可能完全落入西部诸侯的控制。周幽王不糊涂，他知道这件事的后果。',
            '周幽王时代的铭文还记载了- -位权倾天下的诸侯，这个人在周宣王时代就被册封为“皇父”，周幽王时代被加封为“太师尹氏”，当权四十多年，能号令诸侯。周幽王五年(公元前777年),犬戎再度入侵西周王畿镐京,正是这位皇父率领诸侯击溃了犬戎。',
            '此时，周幽王却已经穷得叮当响，再没有可能用“恩惠”来换皇父的“忠诚”。',
            '既然赏无可赏，干脆就罚吧。',
            '公元前777年，皇父被周幽王赶出王畿镐京。之后，周幽王获得了暂时的胜利，废黜了来自西部诸侯国的王后，并立褒姒之子伯服为王位继承人。.',
            '这是一个短暂的胜利，却是西周灭亡的开始。',
            '周幽王之所以能驱逐皇父，不是因为实力，而是因为周王的位置,这个位置代表着道德制高点。一旦整个社会不再信奉道德，那么道德制高点的号召力便降为零，剩余的就要靠实力说话。',
            '失去“王德”的社会,人们只会臣服于强人，只有利益才是真正的信仰。也就是说，这个时候的西周几乎是一种丛林社会，只有赤裸裸的暴力才能制约这些诸侯了。对诸侯来说，周幽王不过就是一个名号，没一起喝过酒、没一起拼过命，凭什么要听你的命令?',
            '无疑，周幽王也看到了这一点。',
            '将皇父赶出镐京的同年，周幽王在太室山与东部诸侯结盟，希望依靠东部诸侯对抗西部诸侯。东部诸侯以殷商移民为主，曾经是西周王室防范的主要敌人。此时，周王室很可能已经到了众叛亲离的地步，周幽王只好放下周王的架子，把自己与东部诸侯摆在了同- -起跑线上。',
            '实力做主的时代，皇父、申后也不会忍受失败，次年，申后的父亲与皇父同时起兵讨伐周幽王，要求立宜臼为王位继承人，更可恨的是，这两位诸侯请来了宿敌犬戎作为帮衬，进攻周京畿。',
            '周幽王根本没有真正的实力,重建的成周八师在皇父、犬戎联军面前-一触即溃,只稍作抵抗镐京便沦陷，东部诸侯并未出兵相救。',
            '公元前771年，周幽王在镐京附近的骊宫被杀，西周亡。'
          ]
        },
      ],
    }
  }
})