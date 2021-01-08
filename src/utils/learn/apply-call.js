function Person(name, age) {
    this.name = name;
    this.age = age;
}

function Student(name, age, sex) {
    this.sex = sex;
    Person.apply(this, arguments);
}

export { Person, Student };
