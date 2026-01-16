import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Lesson = {
  id: string;
  subject: string;
  time: string;
  day: string;
  teacher: string;
  room: string;
};

type Task = {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  estimatedTime: number;
  completed: boolean;
  actualTime?: number;
};

type Tutor = {
  id: string;
  name: string;
  subject: string;
  schedule: string;
  contact: string;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  
  const [lessons, setLessons] = useState<Lesson[]>([
    { id: '1', subject: 'Математика', time: '08:30-09:15', day: 'Понедельник', teacher: 'Иванова А.П.', room: '204' },
    { id: '2', subject: 'Русский язык', time: '09:25-10:10', day: 'Понедельник', teacher: 'Петрова М.И.', room: '312' },
    { id: '3', subject: 'Физика', time: '10:20-11:05', day: 'Понедельник', teacher: 'Сидоров В.К.', room: '108' },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Решить задачи №15-20', subject: 'Математика', dueDate: '2026-01-18', estimatedTime: 45, completed: false },
    { id: '2', title: 'Написать сочинение', subject: 'Литература', dueDate: '2026-01-20', estimatedTime: 90, completed: false },
    { id: '3', title: 'Выучить параграф 12', subject: 'История', dueDate: '2026-01-17', estimatedTime: 30, completed: true, actualTime: 35 },
  ]);

  const [tutors, setTutors] = useState<Tutor[]>([
    { id: '1', name: 'Смирнова О.А.', subject: 'Английский язык', schedule: 'Вт, Чт 16:00', contact: '+7 900 123-45-67' },
    { id: '2', name: 'Кузнецов П.В.', subject: 'Математика', schedule: 'Ср, Пт 17:00', contact: '+7 900 765-43-21' },
  ]);

  const toggleTaskComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="BookOpen" className="text-primary" size={32} />
            <h1 className="text-4xl font-bold text-foreground">Органайзер школьника</h1>
          </div>
          <p className="text-muted-foreground text-lg">Управляй своим временем эффективно</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto h-auto p-1 bg-card shadow-sm">
            <TabsTrigger value="schedule" className="flex items-center gap-2 py-3">
              <Icon name="Calendar" size={18} />
              <span className="hidden sm:inline">Расписание</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2 py-3">
              <Icon name="CheckSquare" size={18} />
              <span className="hidden sm:inline">Задачи</span>
            </TabsTrigger>
            <TabsTrigger value="homework" className="flex items-center gap-2 py-3">
              <Icon name="FileText" size={18} />
              <span className="hidden sm:inline">Дом. задание</span>
            </TabsTrigger>
            <TabsTrigger value="tutors" className="flex items-center gap-2 py-3">
              <Icon name="Users" size={18} />
              <span className="hidden sm:inline">Репетиторы</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2 py-3">
              <Icon name="CalendarDays" size={18} />
              <span className="hidden sm:inline">Календарь</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="animate-fade-in space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Calendar" className="text-primary" size={24} />
                      Расписание уроков
                    </CardTitle>
                    <CardDescription>Твой недельный план занятий</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Добавить урок
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Новый урок</DialogTitle>
                        <DialogDescription>Добавь урок в расписание</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Предмет</Label>
                          <Input placeholder="Математика" />
                        </div>
                        <div>
                          <Label>День недели</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выбери день" />
                            </SelectTrigger>
                            <SelectContent>
                              {weekDays.map(day => (
                                <SelectItem key={day} value={day}>{day}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Время</Label>
                          <Input placeholder="08:30-09:15" />
                        </div>
                        <div>
                          <Label>Учитель</Label>
                          <Input placeholder="Иванова А.П." />
                        </div>
                        <div>
                          <Label>Кабинет</Label>
                          <Input placeholder="204" />
                        </div>
                        <Button className="w-full">Сохранить</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {weekDays.map(day => {
                    const dayLessons = lessons.filter(l => l.day === day);
                    return (
                      <div key={day} className="space-y-3">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <Icon name="Clock" size={18} className="text-primary" />
                          {day}
                        </h3>
                        <div className="space-y-2">
                          {dayLessons.length > 0 ? (
                            dayLessons.map(lesson => (
                              <Card key={lesson.id} className="hover-scale border-l-4 border-l-primary">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      <Badge variant="outline" className="font-mono">{lesson.time}</Badge>
                                      <div>
                                        <p className="font-semibold">{lesson.subject}</p>
                                        <p className="text-sm text-muted-foreground">{lesson.teacher}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <Icon name="MapPin" size={16} />
                                      <span>Каб. {lesson.room}</span>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))
                          ) : (
                            <p className="text-muted-foreground text-sm italic py-2">Нет уроков в этот день</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="animate-fade-in space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="CheckSquare" className="text-primary" size={24} />
                      Список задач
                    </CardTitle>
                    <CardDescription>Отслеживай прогресс выполнения</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Новая задача
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Новая задача</DialogTitle>
                        <DialogDescription>Добавь задачу с учетом времени</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Название задачи</Label>
                          <Input placeholder="Решить задачи" />
                        </div>
                        <div>
                          <Label>Предмет</Label>
                          <Input placeholder="Математика" />
                        </div>
                        <div>
                          <Label>Срок выполнения</Label>
                          <Input type="date" />
                        </div>
                        <div>
                          <Label>Планируемое время (мин)</Label>
                          <Input type="number" placeholder="45" />
                        </div>
                        <Button className="w-full">Добавить</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Icon name="AlertCircle" size={18} className="text-orange-500" />
                    Активные задачи
                  </h3>
                  {tasks.filter(t => !t.completed).map(task => (
                    <Card key={task.id} className="hover-scale">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-1"
                              onClick={() => toggleTaskComplete(task.id)}
                            >
                              <Icon name="Circle" size={20} />
                            </Button>
                            <div className="flex-1">
                              <p className="font-semibold">{task.title}</p>
                              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                                <Badge variant="secondary">{task.subject}</Badge>
                                <span className="flex items-center gap-1">
                                  <Icon name="Calendar" size={14} />
                                  {new Date(task.dueDate).toLocaleDateString('ru-RU')}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Icon name="Clock" size={14} />
                                  {task.estimatedTime} мин
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-2 pt-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Icon name="CheckCircle2" size={18} className="text-green-500" />
                    Выполненные задачи
                  </h3>
                  {tasks.filter(t => t.completed).map(task => (
                    <Card key={task.id} className="opacity-60">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-1"
                              onClick={() => toggleTaskComplete(task.id)}
                            >
                              <Icon name="CheckCircle2" size={20} className="text-green-500" />
                            </Button>
                            <div className="flex-1">
                              <p className="font-semibold line-through">{task.title}</p>
                              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                                <Badge variant="secondary">{task.subject}</Badge>
                                <span className="flex items-center gap-1">
                                  <Icon name="Clock" size={14} />
                                  План: {task.estimatedTime} мин
                                </span>
                                {task.actualTime && (
                                  <span className="flex items-center gap-1 text-green-600">
                                    <Icon name="Timer" size={14} />
                                    Факт: {task.actualTime} мин
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="homework" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" className="text-primary" size={24} />
                  Домашнее задание
                </CardTitle>
                <CardDescription>Задания по предметам на ближайшие дни</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Раздел в разработке. Домашние задания будут отображаться здесь.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tutors" className="animate-fade-in space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Users" className="text-primary" size={24} />
                      Мои репетиторы
                    </CardTitle>
                    <CardDescription>Контакты и расписание занятий</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Добавить
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Новый репетитор</DialogTitle>
                        <DialogDescription>Добавь информацию о репетиторе</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>ФИО репетитора</Label>
                          <Input placeholder="Иванов Иван Иванович" />
                        </div>
                        <div>
                          <Label>Предмет</Label>
                          <Input placeholder="Математика" />
                        </div>
                        <div>
                          <Label>Расписание</Label>
                          <Input placeholder="Пн, Ср 16:00" />
                        </div>
                        <div>
                          <Label>Контакт</Label>
                          <Input placeholder="+7 900 123-45-67" />
                        </div>
                        <Button className="w-full">Сохранить</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {tutors.map(tutor => (
                    <Card key={tutor.id} className="hover-scale">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon name="User" className="text-primary" size={24} />
                          </div>
                          <div className="flex-1 space-y-2">
                            <h3 className="font-semibold text-lg">{tutor.name}</h3>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p className="flex items-center gap-2">
                                <Icon name="BookOpen" size={16} />
                                {tutor.subject}
                              </p>
                              <p className="flex items-center gap-2">
                                <Icon name="Clock" size={16} />
                                {tutor.schedule}
                              </p>
                              <p className="flex items-center gap-2">
                                <Icon name="Phone" size={16} />
                                {tutor.contact}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="CalendarDays" className="text-primary" size={24} />
                  Календарь
                </CardTitle>
                <CardDescription>Общий вид всех событий и заданий</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-muted-foreground">
                    <div>Пн</div>
                    <div>Вт</div>
                    <div>Ср</div>
                    <div>Чт</div>
                    <div>Пт</div>
                    <div>Сб</div>
                    <div>Вс</div>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 35 }, (_, i) => {
                      const day = i - 2;
                      const hasTask = day > 0 && day < 20 && day % 3 === 0;
                      return (
                        <div
                          key={i}
                          className={`aspect-square flex items-center justify-center rounded-lg border text-sm cursor-pointer hover:bg-accent transition-colors ${
                            day <= 0 ? 'text-muted-foreground/40' : 'hover-scale'
                          } ${hasTask ? 'border-primary bg-primary/5' : ''}`}
                        >
                          {day > 0 && day}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border-primary border-2 bg-primary/5"></div>
                      <span>Есть задания</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
