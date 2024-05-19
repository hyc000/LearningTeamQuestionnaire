// Vue 應用程式初始化
new Vue({
  el: '#app',
  data: {
    learningForList: [],
    preferToList: [],
    givingTimeList: [],
    learningGoalList: [],
    preferLearningWayList: [],
    name: '',
    email: '',
    github: '',
    languages: [],
    tools: [],
    skills: [],
    talents: [],
    intro: '',
    comments: '',
    currentLanguage: '',
    currentTool: '',
    currentSkill: '',
    currentTalent: '',
    selectedLearningFor: [],
    selectedPreferTo: [],
    selectedGivingTime: '',
    selectedLearningGoal: [],
    selectedPreferLearningWay: []
  },
  created() {
    this.fetchLearningFor();
    this.fetchPreferTo();
    this.fetchgivingTime();
    this.fetchLearningGoal();
    this.fetchpreferLearningWay()
  },

  mounted() {
    $('li').addClass('required');
  },

  methods: {
    fetchLearningFor() {
      fetch('https://prj-questionnaire.vercel.app/api/learning-for')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          this.learningForList = data;
        })
        .catch(error => {
          console.error('Error fetching prefer learning way data:', error);
          // 捕獲並記錄響應的文本內容
          fetch('https://prj-questionnaire.vercel.app/api/prefer-learning-way')
            .then(response => response.text())
            .then(text => {
              console.error('Response text:', text);
            });
        });
    },
    fetchPreferTo() {
      fetch('https://prj-questionnaire.vercel.app/api/prefer-to')
        .then(response => response.json())
        .then(data => {
          this.preferToList = data;
        })
        .catch(error => {
          console.error('Error fetching prefer to data:', error);
        });
    },
    fetchgivingTime() {
      fetch('https://prj-questionnaire.vercel.app/api/giving-time')
        .then(response => response.json())
        .then(data => {
          this.givingTimeList = data;
        })
        .catch(error => {
          console.error('Error fetching prefer to data:', error);
        });
    },
    fetchLearningGoal() {
      fetch('https://prj-questionnaire.vercel.app/api/learning-goal')
        .then(response => response.json())
        .then(data => {
          this.learningGoalList = data;
        })
        .catch(error => {
          console.error('Error fetching prefer to data:', error);
        });
    },
    fetchpreferLearningWay() {
      fetch('https://prj-questionnaire.vercel.app/api/perfer-learning-way')
        .then(response => response.json())
        .then(data => {
          this.preferLearningWayList = data;
        })
        .catch(error => {
          console.error('Error fetching prefer to data:', error);
        });
    }, addLanguage() {
      if (this.currentLanguage) {
        this.languages.push(this.currentLanguage);
        this.currentLanguage = '';
      }
    },
    addTool() {
      if (this.currentTool) {
        this.tools.push(this.currentTool);
        this.currentTool = '';
      }
    },
    addSkill() {
      if (this.currentSkill) {
        this.skills.push(this.currentSkill);
        this.currentSkill = '';
      }
    },
    addTalent() {
      if (this.currentTalent) {
        this.talents.push(this.currentTalent);
        this.currentTalent = '';
      }
    },       
    

    submitForm() {
      // 送出前驗證 ()
      if(!this.selectedLearningFor || !this.selectedPreferTo || !this.selectedGivingTime || !this.selectedLearningGoal || 
        !this.selectedPreferLearningWay || !this.name)
        {
          alert("紅色＊為必填欄位! 請再檢查")
          return false;
        }

      const formData = {
        selectedLearningFor: this.selectedLearningFor,
        selectedPreferTo: this.selectedPreferTo,
        selectedGivingTime: this.selectedGivingTime,
        selectedLearningGoal: this.selectedLearningGoal,
        selectedPreferLearningWay: this.selectedPreferLearningWay,
        name: this.name,
        email: this.email,
        github: this.github,
        languages: this.languages,
        tools: this.tools,
        skills: this.skills,
        talents: this.talents,
        intro: this.intro,
        comments: this.comments
      };

      fetch('https://prj-questionnaire.vercel.app/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => {
          alert("儲存成功!")
          console.log('Success:', data);
          location.reload();
        })
        .catch((error) => {
          alert("儲存失敗!")
          console.error('Error:', error);
        });
    }
  },
  template: `
    <div>
      <h2>團隊共識</h2>
      <ol>
        <li>
          <div>
            <span>學習需求：</span>
            <span v-for="item in learningForList">
                <input type="checkbox"  :key="item._id" :value="item.LearningFor" v-model="selectedLearningFor">
                <span>{{ item.LearningFor }}</span>
            </span>
          </div>
        </li>
        <li>
          <div>
            <span>偏好種類：</span>
            <span v-for="item in preferToList">
                <input type="checkbox"  :key="item._id" :value="item.PreferTo" v-model="selectedPreferTo">
                <span>{{ item.PreferTo }}</span>
            </span>
          </div>
        </li>
        <li>
          <div>
            <span>可運用時間：</span>
            <select v-model="selectedGivingTime">
              <option value="" selected disabled>請選擇</option>
              <option v-for="item in givingTimeList" :key="item._id" :value="item.GivingTime">
                {{ item.GivingTime }}
              </option>
            </select>
          </div>
        </li>
        <li>
          <div>
            <span>期許目標：</span>
            <span v-for="item in learningGoalList">
                <input type="checkbox"  :key="item._id" :value="item.LearningGoal" v-model="selectedLearningGoal">
                <span>{{ item.LearningGoal }}</span>
            </span>
          </div>
        </li>
        <li>
        <div>
          <span>偏好學習方式：</span>
          <br>
          <span v-for="item in preferLearningWayList" :key="item._id">
            <input type="checkbox" :value="item.LearningWay" v-model="selectedPreferLearningWay">
            <span>{{ item.LearningWay }}：{{ item.Description }}</span><br>
          </span>
        </div>
      </li>
      </ol>
      <h2>個人資料</h2>
      <div>
        <span class="required" style="left:-5px;">名字：</span>
        <input type="text" v-model="name">
      </div>
      <div>
        <span>電子郵件：</span>
        <input type="text" v-model="email">
      </div>
      <div>
        <span>Github連結：</span>
        <input type="text" v-model="github">
      </div>
      <div>
        <span>程式語言：</span>
        <input type="text" v-model="currentLanguage">
        <input type="button" value="增加!" @click="addLanguage">
        <div>
          <ul>
            <li v-for="lang in languages" :key="lang">{{ lang }}</li>
          </ul>
        </div>
      </div>
      <div>
        <span>擅長工具：</span>
        <input type="text" v-model="currentTool">
        <input type="button" value="增加!" @click="addTool">
        <div>
          <ul>
            <li v-for="tool in tools" :key="tool">{{ tool }}</li>
          </ul>
        </div>
      </div>
      <div>
        <span>專業技能：</span>
        <input type="text" v-model="currentSkill">
        <input type="button" value="增加!" @click="addSkill">
        <div>
          <ul>
            <li v-for="skill in skills" :key="skill">{{ skill }}</li>
          </ul>
        </div>
      </div>
      <div>
        <span>才藝：</span>
        <input type="text" v-model="currentTalent">
        <input type="button" value="增加!" @click="addTalent">
        <div>
          <ul>
            <li v-for="talent in talents" :key="talent">{{ talent }}</li>
          </ul>
        </div>
      </div>
      <div>
        <span>自我介紹：</span>
        <br>
        <textarea cols="50" rows="10" v-model="intro" placeholder="看有沒有想要介紹"></textarea>
      </div>
      <div>
        <span>其他想說的話：</span>
        <br>
        <textarea cols="50" rows="10" v-model="comments" placeholder="對於團隊期許、自我期許、還是對於這個頁面的建議，萬分感謝~"></textarea>
      </div>
      <div>
        <button @click="submitForm">提交</button>
      </div>
    </div>
  `
});
